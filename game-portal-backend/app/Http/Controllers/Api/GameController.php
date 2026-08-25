<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Game;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class GameController extends Controller
{
    /**
     * Display a listing of games with filtering, searching, and sorting.
     */
    public function index(Request $request)
    {
        $query = Game::with('categories')
            ->where('status', 'published');

        // Search by title or description
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        // Filter by category slug
        if ($request->filled('category')) {
            $categorySlug = $request->input('category');
            $query->whereHas('categories', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        // Filter by badge (HOT, NEW, WEBGL)
        if ($request->filled('badge')) {
            $query->where('badge', $request->input('badge'));
        }

        // Sort
        $sort = $request->input('sort', 'popular');
        switch ($sort) {
            case 'latest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating_avg', 'desc');
                break;
            case 'popular':
            default:
                $query->orderBy('play_count', 'desc');
                break;
        }

        // Pagination or All
        if ($request->boolean('all')) {
            $games = $query->get();
        } else {
            $perPage = $request->input('per_page', 12);
            $games = $query->paginate($perPage);
        }

        return response()->json([
            'status' => 'success',
            'data' => $games,
        ]);
    }

    /**
     * Get featured games for banner/sliders.
     */
    public function featured()
    {
        $featured = Game::with('categories')
            ->where('status', 'published')
            ->whereIn('badge', ['HOT', 'WEBGL', 'NEW'])
            ->orderBy('play_count', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $featured,
        ]);
    }

    /**
     * Display the specified game by slug.
     */
    public function show($slug)
    {
        $game = Game::where('slug', $slug)
            ->with(['categories', 'comments.user'])
            ->firstOrFail();

        // Increment play count
        $game->increment('play_count');

        // Suggest related games in the same category
        $categoryIds = $game->categories->pluck('id');
        $relatedGames = Game::where('id', '!=', $game->id)
            ->where('status', 'published')
            ->whereHas('categories', function ($q) use ($categoryIds) {
                $q->whereIn('categories.id', $categoryIds);
            })
            ->limit(4)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $game,
            'related' => $relatedGames,
        ]);
    }

    /**
     * Store a newly created game (Admin).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'slug' => 'nullable|string|max:200|unique:games,slug',
            'thumbnail' => 'required',
            'play_url' => 'required|string',
            'description' => 'nullable|string',
            'controls_guide' => 'nullable|string|max:255',
            'badge' => 'nullable|in:HOT,NEW,WEBGL,NORMAL',
            'status' => 'nullable|in:published,draft,hidden',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:categories,id',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        }

        // Handle thumbnail upload if file
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = Storage::url($path);
        }

        $game = Game::create($validated);

        if (!empty($validated['category_ids'])) {
            $game->categories()->sync($validated['category_ids']);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Thêm mới trò chơi thành công!',
            'data' => $game->load('categories'),
        ], 201);
    }

    /**
     * Update the specified game (Admin).
     */
    public function update(Request $request, $id)
    {
        $game = Game::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:200',
            'slug' => 'sometimes|string|max:200|unique:games,slug,' . $game->id,
            'thumbnail' => 'sometimes',
            'play_url' => 'sometimes|string',
            'description' => 'nullable|string',
            'controls_guide' => 'nullable|string|max:255',
            'badge' => 'nullable|in:HOT,NEW,WEBGL,NORMAL',
            'status' => 'nullable|in:published,draft,hidden',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'exists:categories,id',
        ]);

        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $validated['thumbnail'] = Storage::url($path);
        }

        $game->update($validated);

        if (isset($validated['category_ids'])) {
            $game->categories()->sync($validated['category_ids']);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật trò chơi thành công!',
            'data' => $game->load('categories'),
        ]);
    }

    /**
     * Remove the specified game (Admin).
     */
    public function destroy($id)
    {
        $game = Game::findOrFail($id);
        $game->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Đã xóa trò chơi thành công!',
        ]);
    }
}


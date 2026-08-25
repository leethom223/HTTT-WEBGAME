<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories with game count.
     */
    public function index()
    {
        $categories = Category::withCount(['games' => function ($q) {
            $q->where('status', 'published');
        }])->get();

        return response()->json([
            'status' => 'success',
            'data' => $categories,
        ]);
    }

    /**
     * Display the specified category with its games.
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->with(['games' => function ($q) {
                $q->where('status', 'published');
            }])
            ->firstOrFail();

        return response()->json([
            'status' => 'success',
            'data' => $category,
        ]);
    }

    /**
     * Store a newly created category (Admin).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'slug' => 'nullable|string|max:100|unique:categories,slug',
            'icon' => 'nullable|string|max:50',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category = Category::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Tạo danh mục thành công!',
            'data' => $category,
        ], 201);
    }

    /**
     * Update the specified category (Admin).
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'slug' => 'sometimes|string|max:100|unique:categories,slug,' . $category->id,
            'icon' => 'nullable|string|max:50',
        ]);

        $category->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật danh mục thành công!',
            'data' => $category,
        ]);
    }

    /**
     * Remove the specified category (Admin).
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Đã xóa danh mục thành công!',
        ]);
    }
}


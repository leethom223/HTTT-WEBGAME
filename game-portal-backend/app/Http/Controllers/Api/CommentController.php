<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Comment;
use App\Models\Game;

class CommentController extends Controller
{
    /**
     * Get comments for a game.
     */
    public function index($gameId)
    {
        $comments = Comment::where('game_id', $gameId)
            ->with('user:id,name,username,avatar,role')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $comments,
        ]);
    }

    /**
     * Store a comment for a game.
     */
    public function store(Request $request, $gameId)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $game = Game::findOrFail($gameId);

        $comment = Comment::create([
            'user_id' => $request->user()->id,
            'game_id' => $game->id,
            'content' => $request->input('content'),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Đăng bình luận thành công!',
            'data' => $comment->load('user:id,name,username,avatar,role'),
        ], 201);
    }

    /**
     * Delete a comment (Owner or Admin).
     */
    public function destroy(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);
        $user = $request->user();

        if ($comment->user_id !== $user->id && $user->role !== 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Bạn không có quyền xóa bình luận này!',
            ], 403);
        }

        $comment->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Đã xóa bình luận!',
        ]);
    }
}


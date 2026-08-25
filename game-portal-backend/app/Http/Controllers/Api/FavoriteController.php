<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Favorite;
use App\Models\Game;

class FavoriteController extends Controller
{
    /**
     * Get list of favorite games for the authenticated user.
     */
    public function index(Request $request)
    {
        $favorites = Favorite::where('user_id', $request->user()->id)
            ->with(['game.categories'])
            ->orderBy('created_at', 'desc')
            ->get();

        $games = $favorites->pluck('game');

        return response()->json([
            'status' => 'success',
            'data' => $games,
        ]);
    }

    /**
     * Toggle favorite status of a game.
     */
    public function toggle(Request $request, $gameId)
    {
        $userId = $request->user()->id;
        $game = Game::findOrFail($gameId);

        $favorite = Favorite::where('user_id', $userId)
            ->where('game_id', $game->id)
            ->first();

        if ($favorite) {
            $favorite->delete();
            $isFavorited = false;
            $message = 'Đã bỏ yêu thích!';
        } else {
            Favorite::create([
                'user_id' => $userId,
                'game_id' => $game->id,
            ]);
            $isFavorited = true;
            $message = 'Đã thêm vào danh sách yêu thích!';
        }

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'is_favorited' => $isFavorited,
        ]);
    }

    /**
     * Check if a game is favorited by the current user.
     */
    public function check(Request $request, $gameId)
    {
        $isFavorited = Favorite::where('user_id', $request->user()->id)
            ->where('game_id', $gameId)
            ->exists();

        return response()->json([
            'status' => 'success',
            'is_favorited' => $isFavorited,
        ]);
    }
}


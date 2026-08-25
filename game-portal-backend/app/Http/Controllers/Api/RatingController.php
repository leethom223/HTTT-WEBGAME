<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Rating;
use App\Models\Game;

class RatingController extends Controller
{
    /**
     * Rate a game (1 to 5 stars) and update the game's rating_avg.
     */
    public function store(Request $request, $gameId)
    {
        $request->validate([
            'score' => 'required|integer|min:1|max:5',
        ]);

        $game = Game::findOrFail($gameId);
        $userId = $request->user()->id;

        $rating = Rating::updateOrCreate(
            ['user_id' => $userId, 'game_id' => $game->id],
            ['score' => $request->input('score')]
        );

        // Recalculate average rating
        $avg = Rating::where('game_id', $game->id)->avg('score');
        $game->rating_avg = round($avg, 2);
        $game->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Đánh giá thành công!',
            'score' => $rating->score,
            'rating_avg' => $game->rating_avg,
        ]);
    }

    /**
     * Get the authenticated user's rating for a game.
     */
    public function userRating(Request $request, $gameId)
    {
        $rating = Rating::where('user_id', $request->user()->id)
            ->where('game_id', $gameId)
            ->first();

        return response()->json([
            'status' => 'success',
            'score' => $rating ? $rating->score : null,
        ]);
    }
}


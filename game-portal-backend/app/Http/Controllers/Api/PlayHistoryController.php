<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\PlayHistory;
use App\Models\Game;

class PlayHistoryController extends Controller
{
    /**
     * Get play history of the authenticated user.
     */
    public function index(Request $request)
    {
        $history = PlayHistory::where('user_id', $request->user()->id)
            ->with(['game.categories'])
            ->orderBy('played_at', 'desc')
            ->limit(20)
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $history,
        ]);
    }

    /**
     * Record a game play event.
     */
    public function store(Request $request, $gameId)
    {
        $game = Game::findOrFail($gameId);
        $user = $request->user();

        $history = PlayHistory::create([
            'user_id' => $user ? $user->id : null,
            'game_id' => $game->id,
            'played_at' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $history,
        ]);
    }
}


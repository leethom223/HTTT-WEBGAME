<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\PlayHistoryController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/ping', fn() => response()->json(['status' => 'ok', 'timestamp' => now()]));

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Categories & Games
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

Route::get('/games', [GameController::class, 'index']);
Route::get('/games/featured', [GameController::class, 'featured']);
Route::get('/games/{slug}', [GameController::class, 'show']);
Route::get('/games/{gameId}/comments', [CommentController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Authenticated Member Routes (auth:sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // User Profile
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    // Comments
    Route::post('/games/{gameId}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

    // Ratings
    Route::post('/games/{gameId}/ratings', [RatingController::class, 'store']);
    Route::get('/games/{gameId}/ratings/me', [RatingController::class, 'userRating']);

    // Favorites
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/{gameId}/toggle', [FavoriteController::class, 'toggle']);
    Route::get('/favorites/{gameId}/check', [FavoriteController::class, 'check']);

    // Play History
    Route::get('/history', [PlayHistoryController::class, 'index']);
    Route::post('/history/{gameId}', [PlayHistoryController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Admin Management Routes (auth:sanctum + admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Category CRUD
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // Game CRUD
    Route::post('/games', [GameController::class, 'store']);
    Route::put('/games/{id}', [GameController::class, 'update']);
    Route::delete('/games/{id}', [GameController::class, 'destroy']);
});



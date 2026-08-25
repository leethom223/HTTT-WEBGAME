<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'online',
        'app' => 'GAMEX PORTAL REST API',
        'version' => '1.0.0',
        'games_api' => '/api/games',
        'categories_api' => '/api/categories',
    ]);
});

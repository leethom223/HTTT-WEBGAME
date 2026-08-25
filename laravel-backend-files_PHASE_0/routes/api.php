<?php

use Illuminate\Support\Facades\Route;

// Nhiệm vụ 5e - route test CORS
Route::get('/ping', function () {
    return response()->json(['status' => 'ok']);
});

// Các route Phase 3 sẽ thêm tiếp ở đây (auth, games, categories...)

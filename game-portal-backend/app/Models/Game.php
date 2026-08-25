<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'thumbnail',
        'play_url',
        'description',
        'controls_guide',
        'play_count',
        'rating_avg',
        'badge',
        'status',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'game_category');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function playHistories()
    {
        return $this->hasMany(PlayHistory::class);
    }
}


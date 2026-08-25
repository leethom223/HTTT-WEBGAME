<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Trí tuệ', 'slug' => 'tri-tue', 'icon' => '🧩'],
            ['name' => 'Arcade', 'slug' => 'arcade', 'icon' => '🕹️'],
            ['name' => 'Hành động', 'slug' => 'hanh-dong', 'icon' => '⚔️'],
            ['name' => 'Đua xe', 'slug' => 'dua-xe', 'icon' => '🏎️'],
            ['name' => 'Bắn súng', 'slug' => 'ban-sung', 'icon' => '🎯'],
            ['name' => 'Thể thao', 'slug' => 'the-thao', 'icon' => '⚽'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }
    }
}


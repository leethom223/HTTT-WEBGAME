<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin
        User::updateOrCreate(
            ['email' => 'admin@gameportal.com'],
            [
                'name' => 'Administrator',
                'username' => 'admin',
                'password' => Hash::make('admin123'),
                'avatar' => 'https://api.dicebear.com/7.x/bottts/svg?seed=admin',
                'role' => 'admin',
            ]
        );

        // Member 1
        User::updateOrCreate(
            ['email' => 'gamer99@gmail.com'],
            [
                'name' => 'GamerPro99',
                'username' => 'gamer99',
                'password' => Hash::make('123456'),
                'avatar' => 'https://api.dicebear.com/7.x/adventurer/svg?seed=gamer99',
                'role' => 'member',
            ]
        );

        // Member 2
        User::updateOrCreate(
            ['email' => 'minhtri@gmail.com'],
            [
                'name' => 'Minh Trí',
                'username' => 'minhtri2k',
                'password' => Hash::make('123456'),
                'avatar' => 'https://api.dicebear.com/7.x/adventurer/svg?seed=minhtri',
                'role' => 'member',
            ]
        );
    }
}


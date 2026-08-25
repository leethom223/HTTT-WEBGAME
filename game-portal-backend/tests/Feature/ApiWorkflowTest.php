<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use App\Models\User;
use App\Models\Game;
use App\Models\Category;

class ApiWorkflowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_ping_endpoint(): void
    {
        $response = $this->getJson('/api/ping');
        $response->assertStatus(200)
                 ->assertJson(['status' => 'ok']);
    }

    public function test_get_categories_and_games(): void
    {
        $catResponse = $this->getJson('/api/categories');
        $catResponse->assertStatus(200)
                    ->assertJsonStructure(['status', 'data']);

        $gameResponse = $this->getJson('/api/games');
        $gameResponse->assertStatus(200)
                     ->assertJsonStructure(['status', 'data']);
    }

    public function test_user_login(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'admin@gameportal.com',
            'password' => 'admin123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['status', 'token', 'user']);
    }

    public function test_member_forbidden_from_admin_routes(): void
    {
        $member = User::where('role', 'member')->first();
        $this->actingAs($member);

        $response = $this->postJson('/api/admin/categories', [
            'name' => 'Hack Category',
        ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_create_category(): void
    {
        $admin = User::where('role', 'admin')->first();
        $this->actingAs($admin);

        $response = $this->postJson('/api/admin/categories', [
            'name' => 'Chiến thuật Test',
            'slug' => 'chien-thuat-test',
            'icon' => '♟️',
        ]);

        $response->assertStatus(201)
                 ->assertJson(['status' => 'success']);
    }

    public function test_member_can_toggle_favorite_and_comment(): void
    {
        $member = User::where('role', 'member')->first();
        $game = Game::first();
        $this->actingAs($member);

        // Favorite toggle
        $favResponse = $this->postJson("/api/favorites/{$game->id}/toggle");
        $favResponse->assertStatus(200);

        // Comment
        $cmtResponse = $this->postJson("/api/games/{$game->id}/comments", [
            'content' => 'Trò chơi này quá hay và mượt mà!',
        ]);
        $cmtResponse->assertStatus(201);
    }
}


<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Hotel;
use App\Review;

class HotelTest extends TestCase
{

    use RefreshDatabase;

    /**
     * Get all hotels api test unit.
     *
     * @return void
     */
    public function testGetHotels()
    {
        $users = factory(User::class, 5)->create();
        $hotels = factory(Hotel::class, 5)->create();
        $reviews = factory(Review::class, 20)->create()->each(function($review) use ($hotels, $users){
            $review->hotel_id = $hotels->random()->id;
            $review->user_id = $users->random()->id;
            $review->save();
        });

        $response = $this->json("GET", "/api/hotels");
        $response->assertStatus(200)
                 ->assertJsonStructure([['id', 'name', 'description', 'reviews_count']]);
    }
}

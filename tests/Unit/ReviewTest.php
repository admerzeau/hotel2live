<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Hotel;
use App\Review;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Get reviews api test unit.
     *
     * @return void
     */
    public function testGetReviews()
    {
        $users = factory(User::class, 5)->create();
        $hotels = factory(Hotel::class, 5)->create();
        $reviews = factory(Review::class, 50)->create()->each(function($review) use ($hotels, $users){
            $review->hotel_id = $hotels->random()->id;
            $review->user_id = $users->random()->id;
            $review->save();
        });

        //Get all reviews
        $hotelId = $hotels->random()->id;
        $response = $this->json("GET", "/api/reviews?hotel=$hotelId");
        $response->assertStatus(200)
                 ->assertJsonStructure([['id', 'review', 'user_id', 'hotel_id', 'created_at', 'updated_at', 'user' => ['id', 'email', 'name']]]);

        //Get only n reviews
        $hotel = Hotel::withCount(['reviews'])->get()->random(1)->first();
        $hotelId = $hotel->id;
        $hotelReviews = $hotel->reviews_count;

        if($hotelReviews > 0)
            $hotelReviews = $hotelReviews - 1;
        
        $response = $this->json("GET", "/api/reviews?hotel=$hotelId&elements=$hotelReviews");
        $response->assertStatus(200)
                 ->assertJsonCount($hotelReviews)
                 ->assertJsonStructure([['id', 'review', 'user_id', 'hotel_id', 'created_at', 'updated_at', 'user' => ['id', 'email', 'name']]]);
    }

    /**
     * Create review test unit.
     * 
     * @return void
     */
    public function testCreateReview()
    {        
        $users = factory(User::class, 5)->create();
        $hotels = factory(Hotel::class, 5)->create();
        $reviews = factory(Review::class, 50)->create()->each(function($review) use ($hotels, $users){
            $review->hotel_id = $hotels->random()->id;
            $review->user_id = $users->random()->id;
            $review->save();
        });

        $randomHotel = Hotel::inRandomOrder()->get()->first();
        $review = "This is an example of a review";

        $response = $this->json("POST", "/reviews/create", ['hotel' => $randomHotel->id, 'review' => $review]);
        $response->assertStatus(401)
                 ->assertJsonStructure(['message']);

        $user = factory(User::class)->create();
        $hotel = factory(Hotel::class)->create();
        
        $response  = $this->actingAs($user)->json("POST", "/reviews/create", ['hotel' => rand(500, 1000), 'review' => "This is an example of a review"]); 
        $response->assertStatus(401)
                 ->assertJsonStructure(['message']);

        $response =  $this->actingAs($user)->json("POST", "/reviews/create", ['hotel' => $hotel->id, 'review' => '']);
        $response->assertStatus(401)
                ->assertJsonStructure(['message']);

        $response  = $this->actingAs($user)->json("POST", "/reviews/create", ['hotel' => $hotel->id, 'review' => "This is an example of a review"]); 
        $response->assertStatus(201)
                 ->assertJsonStructure(['message']);
    }
}

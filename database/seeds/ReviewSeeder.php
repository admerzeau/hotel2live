<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Hotel;
use App\Review;


class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $hotels = Hotel::all();

        $reviews = factory(Review::class, 50)->create()->each(function($review) use ($hotels, $users){
            $review->hotel_id = $hotels->random()->id;
            $review->user_id = $users->random()->id;
            $review->save();
        });
    }
}

<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Review;
use Faker\Generator as Faker;

$factory->define(Review::class, function (Faker $faker) {
    return [
        "review" => $faker->text($maxNbChars = 200),
        "user_id" => null,
        "hotel_id" => null,
    ];
});
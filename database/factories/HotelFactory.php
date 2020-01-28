<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Hotel;
use Faker\Generator as Faker;

$factory->define(Hotel::class, function (Faker $faker) {
    $type = (bool)rand(0,1) ? "Hotel" : "Suites";
    return [
        'name' => $faker->city . " " . $type,
        'description' => $faker->text($maxNbChars = 200)
    ];
});

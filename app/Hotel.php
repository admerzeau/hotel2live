<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Review;

class Hotel extends Model
{
    public static function getAll($include_counter = true)
    {
        if($include_counter)
        {
            return Hotel::withCount(['reviews'])->get();
        }
        else
            return $this->all();
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'hotel_id');
    }
}

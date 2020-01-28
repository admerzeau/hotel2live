<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Hotel;
use App\Review;

class Review extends Model
{
    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'hotel_id');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

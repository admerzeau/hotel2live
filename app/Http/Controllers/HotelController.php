<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Hotel;

class HotelController extends Controller
{
    /**
     * Hotels with the number of reviews
     * @return Json
     */
    public function index()
    {    
        $hotels = Hotel::getAll();
        return response()->json($hotels);
    }
}

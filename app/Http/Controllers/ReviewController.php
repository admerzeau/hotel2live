<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Hotel;
use App\Review;

class ReviewController extends Controller
{
    /**
     * Hotels with the number of reviews
     * @return Json
     */
    public function index(Request $request)
    {    
        $hotel = $request->input('hotel');
        $elements = $request->input('elements') ?? null;

        if( (!isset($hotel) || intval($hotel) == 0) || (isset($elements) && intval($elements) == 0) ){
            return response()->json(['message' => 'Invalid request params'], 400);
        }

        if (Hotel::where('id', $hotel)->count() == 0){
            return response()->json(['message' => 'The requested data does not exist'], 404);
        }
        
        $reviews = Review::with('user:id,email,name')->where('hotel_id', $hotel)->orderBy('created_at', 'desc')->limit($elements)->get();
        return response()->json($reviews);
    }

    /**
     * Create new review
     * @return Json
     */
    public function create(Request $request)
    {
        if (Auth::check()) {
           
            $user = Auth::id();
            $hotel = $request->json('hotel');
            $review = $request->json('review') ?? null;

            if($review == null || Hotel::where('id', $hotel)->count() == 0)
            {
                return response()->json(['message' => 'Invalid request params'], 401);
            }

            $reviewModel = new Review;
            $reviewModel->hotel_id = $hotel;
            $reviewModel->user_id = $user;
            $reviewModel->review = $review;
            $reviewModel->save();

            return response()->json(['message' => 'Successful'], 201);
        }
        else{
            return response()->json(['message' => 'Must be logeed to post a review'], 401);
        }
    }
}

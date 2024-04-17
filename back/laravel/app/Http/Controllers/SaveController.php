<?php

namespace App\Http\Controllers;

use App\Models\Save;
use Illuminate\Http\Request;

class SaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Save::all();
    }

    public function getSave($request)
    {
        return Save::find($request->id);
    }

    public function getSavesByUser($request)
    {
        return Save::where('user_id', $request->user_id)->get();
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $newSave= new Save();
        $newSave->state = $request->state;
        $newSave->FirstMap = $request->FirstMap;
        $newSave->SecondMap = $request->SecondMap;
        $newSave->ThirdMap = $request->ThirdMap;
        $newSave->user_id = $request->user_id;
        $newSave->save();
        return $newSave;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Save $save)
    {
        $save= Save::find($request->id);
        $save->state = $request->state;
        $save->save();
        return $save;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Save $save)
    {
        $save->delete();
        return response()->json(
            [
                'message' => 'Save deleted'
            ]
        );
    }
}



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
        return response()->json(Save::all(), 200);
    }

    public function getSave(Request $request)
    {
        $save = Save::find($request->id);
        if (!$save) {
            abort(404, 'Save not found');
        }
        return response()->json($save, 200);
    }

    public function getSavesByUser($user)
    {
        $saves = Save::where('user_id', $user)->get();
        return response()->json($saves, 200);
    }

    public function show(Request $request)
    {
        $saveToShow = Save::find($request->id);
        return response()->json($saveToShow, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $newSave = new Save();
        $newSave->state = $request->state;
        $newSave->FirstMap = $request->FirstMap;
        $newSave->SecondMap = $request->SecondMap;
        $newSave->ThirdMap = $request->ThirdMap;
        $newSave->user_id = $request->user_id;
        $newSave->save();
        return response()->json($newSave, 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Save $save)
    {
        $existingSave = Save::find($save->id);
        if (!$existingSave) {
            abort(404, 'Save not found');
        }
        $existingSave->state = $request->state;
        $existingSave->save();
        return response()->json($existingSave, 200);
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
            ],
            200
        );
    }
}

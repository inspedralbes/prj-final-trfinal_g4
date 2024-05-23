<?php

namespace App\Http\Controllers;

use App\Models\Map;
use App\Models\ReportedMaps;
use App\Models\User;
use Illuminate\Http\Request;

class ReportedMapsController extends Controller
{
    //
    public function index()
    {
        return response()->json(ReportedMaps::all(), 200);
    }

    public function getReportedMap(Request $request)
    {
        $reportedMap = ReportedMaps::find($request->id);
        if (!$reportedMap) {
            abort(404, 'Reported maps not found');
        }
        return response()->json($reportedMap, 200);
    }

    public function getReportedMapsByUser(Request $request)
    {
        $reportedMaps = ReportedMaps::where('user_id', $request->id)->get();
        if (!$reportedMaps) {
            abort(404, 'Reported map not found');
        }
        return response()->json($reportedMaps, 200);
    }

    public function show(Request $request)
    {
        $reportedMapToShow = ReportedMaps::find($request->id);
        return response()->json($reportedMapToShow, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'map_id' => 'required | integer',
            'reason' => 'required '
        ]);

        $map = Map::where('id', $request->map_id)->first();
        if ($request->user_id) {
            $user = User::where('id', $request->user_id)->first();
            $userID = $user->id;
        } else {
            $userID = null;
        }

        if ($map) {
            $newReportedMap = new ReportedMaps();
            $newReportedMap->map_id = $request->map_id;
            $newReportedMap->user_id = $userID;
            $newReportedMap->reason = $request->reason;
            $newReportedMap->save();

            $map->reports++;

            if ($map->reports > 5) {
                $map->state = 'Reported';
            }

            $map->save();

            return response()->json($newReportedMap, 200);
        } else {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        } 
    }

    public function destroy(ReportedMaps $reportedMap)
    {
        $reportedMap->delete();
        return response()->json([
            'message' => 'Reported map deleted'
        ], 200);
    }
}

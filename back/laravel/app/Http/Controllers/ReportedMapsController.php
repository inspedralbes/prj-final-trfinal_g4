<?php

namespace App\Http\Controllers;

use App\Models\ReportedMaps;
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
        $newReportedMap = new ReportedMaps();
        $newReportedMap->map_id = $request->map_id;
        $newReportedMap->user_id = $request->user_id;
        $newReportedMap->reason = $request->reason;
        $newReportedMap->save();
        return response()->json($newReportedMap, 201);
    }

    public function destroyReport(ReportedMaps $reportedMap)
    {
        $reportedMap->delete();
        return response()->json([
            'message' => 'Reported map deleted'
        ], 200);
    }
}

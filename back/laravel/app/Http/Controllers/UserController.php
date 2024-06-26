<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(User::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'username' => 'required',
            'email' => 'required | email | unique:users,email',
            'password' => 'required|confirmed',
        ]); 

        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'Email already exists'
            ], 400);
        }

        $newUser = new User();
        $newUser->name = $request->name;
        $newUser->username = $request->username;
        $newUser->email = $request->email;
        $newUser->password = Hash::make($request->password);
        $newUser->image = '/images/profiles/default.png';
        
        if ($request->admin) {
            $newUser->admin = $request->admin;
        }

        if ($request->googleLogin) {
            $newUser->googleLogin = $request->googleLogin;
        }

        if ($newUser->save() === false) {
            return response()->json([
                'message' => 'Error creating user'
            ], 400);
        } else {
            return response()->json([
                'message' => 'User created!',
                'user' => $newUser->username,
                'email' => $newUser->email,
                'id' => $newUser->id,
                'admin' => $newUser->admin,
                'token' => $newUser->createToken('AppToken')->plainTextToken
            ], 200);
        }
    }
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Dades incorrectes!'
            ],401);
        }
        
        return response()->json([
            'message' => 'Logged in!',
            'user' => $user->username,
            'email' => $user->email,
            'id' => $user->id,
            'image' => $user->image,
            'admin' => $user->admin,
            'token' => $user->createToken('AppToken')->plainTextToken
        ], 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out!'
        ]);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    public function showAllUsers()
    {
        return response()->json(User::all());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'user_id' => 'required'
        ]);

        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        
        if ($request->name) {
            $request->validate([
                'name' => 'required'
            ]);
            $user->name = $request->name;
        }

        if ($request->username) {
            $request->validate([
                'username' => 'required'
            ]);
            $user->username = $request->username;
        }

        if ($request->email) {
            $request->validate([
                'email' => 'required | email | unique:users,email'
            ]);
            $user->email = $request->email;
        }

        if ( $request->password) {
            $request->validate([
                'password' => 'required|confirmed'
            ]);
            $user->password = Hash::make($request->password);
        }

        if ($request->hasFile('image')) {
            $imgPath = $request->file('image')->storeAs('/images/profiles', $request->file('image')->getClientOriginalName());
            $img = $request->file('image');
            $imgName = $img->getClientOriginalName();
            $img->move(public_path('images/profiles'), $imgName);
            $user->image = '/' . $imgPath;
        }

        if ($request->admin == 1) {
            $user->admin = true;
        } else if ($request->admin == 0){
            $user->admin = false;
        }
        
        if ($request->googleLogin) {
            $request->validate([
                'googleLogin' => 'required'
            ]);
            $user->googleLogin = $request->googleLogin;
        }

        if ($user->save() == false) {
            return response()->json([
                'message' => 'Error updating user'
            ], 400);
        } else {
            return response()->json([
                'message' => 'User updated!',
                'user' => $user->username,
                'id' => $user->id,
                'admin' => $user->admin,
                'email' => $user->email,
                'image' => $user->image
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json($user);
    }
}
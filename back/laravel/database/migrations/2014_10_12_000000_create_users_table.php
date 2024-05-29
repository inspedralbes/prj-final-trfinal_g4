<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username');
            $table->binary('image')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('admin')->default(false);
            $table->boolean('googleLogin')->default(false);
        });

        DB::table('users')->insert([
            'name'=> 'Ruben',
            'username'=> 'rubenlora',
            'email'=> 'a21rublormar@inspedralbes.cat',
            'password'=> '$2y$10$3Ltz.qHzgfhvCMT5BtMT4u5t7Q2dx2fVjL13x7aW7Qs/4uMXUNcbS',
            'image'=> '/images/profiles/default.png',
            'admin'=> true,
        ]);

        DB::table('users')->insert([
            'name'=> 'Julie Villegas',
            'username'=> 'julsluks',
            'email'=> 'a22betvilver@inspedralbes.cat',
            'password'=> '$2y$10$1opw2CB1RHEZorsHBIdonOJ8nBtTdZLrfqtDFYRYX1P7j7D992ooW',
            'image'=> '/images/profiles/default.png',
        ]);
        
        DB::table('users')->insert([
            'name'=> 'Fabian123',
            'username'=> 'Fabian123',
            'email'=> 'a21fabrolfer@inspedralbes.cat',
            'password'=> '$2y$10$MWSkRRURBdKMjTWyeN3j4uI0pXACT3wWhnqfWDdJTaxpXqwiVXBEi',
            'image'=> '/images/profiles/fabian.png'
        ]);

        DB::table('users')->insert([
            'name'=> 'Sara123',
            'username'=> 'Sara123',
            'email'=> 'a21sarmarbau@inspedralbes.cat',
            'password'=> '$2y$10$KoGovY7AYFCS4VVjA/erlOI.Qx4EXG2dBBcHi6mU.cROL620RyxZy',
            'image'=> '/images/profiles/SaraPerfil.png'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
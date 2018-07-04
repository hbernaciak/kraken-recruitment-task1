<?php

namespace App\Http\Controllers;

use App\Document;
use App\Http\Requests\DocumentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = Document::whereUserHash($request->header('X-USER-HASH'))->get();
        return response()->json($items);
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  DocumentRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(DocumentRequest $request)
    {

        if ($request->file('filename')->isValid()) {
            $file = $request->file('filename');
            $ext = $file->getClientOriginalExtension();
            $newFilename = hash('sha256', $request->get('name'));


            if (Storage::putFileAs('/public/' . $request->header('X-USER-HASH'), $file, $newFilename)) {
                return Document::create([
                    'name' => $request->get('name'),
                    'filename' => $newFilename,
                    'extension' => $ext,
                    'user_hash' => $request->header('X-USER-HASH'),
                ]);
            }
            return response()->json(['message' => 'Successfully added']);
        }
        return response()->json([
            'message' => 'The given file was invalid.',
            'errors' => ['Your file doesn\'t pass our security tests.']
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request $request
     * @param  int $id
     * @return mixed
     */
    public function destroy(Request $request, $id)
    {
        $file = Document::whereUserHash($request->header('X-USER-HASH'))->whereId($id)->firstOrFail();

        if (Storage::disk('local')->exists('/public/' . $request->header('X-USER-HASH') . '/' . $file->filename)) {
            if (Storage::disk('local')->delete('/public/' . $request->header('X-USER-HASH') . '/' . $file->filename)) {
                if ($file->delete()) {
                    return response()->json(['message' => 'Successfully deleted']);
                }
            }
            return response()->json([
                'message' => 'Delete failed.',
                'errors' => ['Cannot remove your file. Try again.']
            ], 422);
        }

        return response()->json([
            'message' => 'Delete failed.',
            'errors' => ['Your file doesn\'t no longer exist.']
        ], 422);
    }
}

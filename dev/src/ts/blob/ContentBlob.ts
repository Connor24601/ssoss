import './BlobManager'
import { BlobType } from '../resources/constants.js';
//import React from 'react';

export class ContentBlob
{
	// variables
	//string BlobEnumValue // TODO: decide if this should exist or be merged with id
							// considerations: duplicate of same blob

	id : string = "";
	redirect?: URL;
	defaultName!:string;
	blobType!:BlobType;

	ContentBlob(id: string, redirect: URL, defaultName:string, blobType:BlobType)
	{
		this.id = id;
		this.redirect = redirect;
		this.defaultName = defaultName;
		this.blobType = blobType;
		return;
	};

	
	//string defaultName
	//icon? defaultIcon
	//BlobType blobType
	
	
	


	//Dict<profileId, BlobAuth> BlobAuths
	//Set<profileId>? CollaborativeBlobUsers

	// methods
	// constructor(from JS)
	//bool removeAllBlobAuth()
	//bool addBlobAuth(BlobAuth) // BlobAuth should contain BlobEnum
	//bool removeBlobAuth(profileId)
	//bool addCollaborativeUser(profileId)
	//bool removeCollaborativeUser(profileId)
	//bool removeAllCollaborativeUsers()

}
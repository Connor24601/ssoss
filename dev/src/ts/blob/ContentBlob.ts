import './BlobManager'
import { BlobId, BlobType } from '../resources/constants.js';
//import React from 'react';

export class ContentBlob
{

	id! : BlobId;
	redirect?: URL;
	defaultName!:string;
	blobType!:BlobType;

	constructor(id: BlobId, redirect: URL, defaultName:string, blobType:BlobType)
	{
		this.id = id;
		this.redirect = redirect;
		this.defaultName = defaultName;
		
		this.blobType = blobType;
		return;
	};

	//string? defaultProfileId // which collab user to use
	//string defaultName
	//icon? defaultIcon
	//BlobType blobType
	

	//Dict<profileId, BlobAuth> BlobAuths
	//Set<profileId>? CollaborativeBlobUsers

	// methods
	//bool removeAllBlobAuth()
	//bool addBlobAuth(BlobAuth) // BlobAuth should contain BlobEnum
	//bool removeBlobAuth(profileId)
	//bool addCollaborativeUser(profileId)
	//bool removeCollaborativeUser(profileId)
	//bool removeAllCollaborativeUsers()

}
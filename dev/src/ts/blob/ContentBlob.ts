import './BlobManager'
import { BlobId, BlobSource, BlobType } from '../resources/constants.js';
//import React from 'react';

export class ContentBlob
{
	type:BlobType = BlobType.unknown;
	id! : BlobId;
	defaultName!:string;
	blobSource!:BlobSource;

	constructor(id: BlobId, defaultName:string, blobSource:BlobSource=BlobSource.custom)
	{
		this.id = id;
		//this.redirect = redirect;
		this.defaultName = defaultName;
		
		this.blobSource = blobSource;
		return;
	};

	defaultProfileId?:string // which collab user to use
	//icon?:Icon;
	

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

// not to be confused with BlobSource.web, which is source JSON location
export class WebBlob extends ContentBlob {
	
	type:BlobType = BlobType.web;
	url:URL;

	constructor(url:URL, ...superParam: ConstructorParameters<typeof ContentBlob>)
	{
		super(...superParam);
		this.url=url;
	}
}
import { SelectableObjectType } from '../models/game';

export interface HoldsCards {
    name: string;
    email: string;
    bio?: string;
    birthday?: number;
    gender: string;
    age?: number;
    preference: string;
    location?: any;
    bodyType: string;
    bodyTypePreference?: string[];
    bodyTypePreferenceRaw?: any;//used to make using the <input> tag easier on the ui. See user-helper.service
    range: number;
    ageRange: any;
    error?: string;
    _id?: string;
    photo?: string;
    photos?: string[];
    points?: {
        current?: number,
        total?: number
    }
}

export interface Selectable {
    select();
    deselect();
    getType():SelectableObjectType;
    getData():any;
}

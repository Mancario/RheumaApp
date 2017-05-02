import { Injectable } from "@angular/core"
import { NativeStorage } from '@ionic-native/native-storage'
import { DiaryEntry } from '../pages/pain-diary/pain-diary-service'

const DIARY_STORAGE_PREFIX = "DIARY:"
const DIARY_STORAGE_LIST = DIARY_STORAGE_PREFIX + "LIST"
const DIARY_STORAGE_PENDING_UPDATES = "PENDING"

@Injectable()
export class EntryStorageService {

    constructor(private _storage: NativeStorage) { }

    public storeDiaryEntry(entry: DiaryEntry): void {

    }
/*
    public retrieveDiaryEntry(date: string): Promise<DiaryEntry> {
      return null;
    }
    */
}

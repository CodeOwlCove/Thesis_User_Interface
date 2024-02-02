export class FileInformation{
    public filename: string;
    public filetype: string;
    public filesize: string;

    constructor(filename: string, filetype: string, filesize: string) {
        this.filename = filename;
        this.filetype = filetype;
        this.filesize = filesize;
    }
}

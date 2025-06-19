import { UPLOADED_FILE } from '@/types';
import { API_RESPONSE } from '@/types';
import HttpService from '../http.service';

class Uploads extends HttpService {
  private uploads = 'uploads/files';

  public async getUploads({ fileName }: { fileName: string }): Promise<API_RESPONSE<UPLOADED_FILE[]>> {
    const path = `${this.uploads}?filters[name][$eq]=${fileName}`;
    return this.GET<API_RESPONSE<UPLOADED_FILE[]>>(path);
  }
}

export { Uploads as default };

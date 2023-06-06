import axios from '@/plugins/axios';

const GET = 'GET';
const POST = 'POST';

export class ApiClass {
  async axiosCall(config) {
    const response = await axios.request(config);
    return response.data;
  }

  async getAllDicts() {
    return await this.axiosCall({ method: GET, url: '/GetDictionaryList' });
  }

  async getDict(dict) {
    return await this.axiosCall({ method: GET, url: `` });
  }
}

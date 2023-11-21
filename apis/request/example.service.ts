import { ServiceBase } from 'apis/service-base';

class NftService extends ServiceBase {
  getExample = async (params: any) => {
    const res = await this.get('/user');
    return res.data;
  };
 
}
const nftService = new NftService();
export default nftService;

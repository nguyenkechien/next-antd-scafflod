import { SystemsData } from '../../constants/ConstTypes';
import { resJson } from '../../core/utilServer';

const Systems = {
  GetAll(req, res) {
    setTimeout(() => {
      return res.json(resJson({ result: SystemsData }));
    }, 5000);
  },
};

export default Systems;

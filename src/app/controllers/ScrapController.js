import * as Yup from 'yup';

import Scrap from '../models/Scrap';

class ScraController {
  async index(req, res) {
    try {
      const scraps = await Scrap.findAll({
        attributes: ['id', 'tytle', 'message'],
        where: {
          user_id: req.userId,
        },
      });
      return res.json(scraps);
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        tytle: Yup.string().required(),
        message: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'validation failed' });
      }

      const scrap = {
        user_id: req.userId,
        ...req.body,
      };

      const { id, tytle, message } = await Scrap.create(scrap);

      return res.json({ id, tytle, message });
    } catch (error) {
      return res.json(error);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        tytle: Yup.string(),
        message: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'validation failed' });
      }

      const scrap = await Scrap.findByPk(req.params.id);
      console.log(scrap);
      if (!scrap) {
        return res.status(404).json({ error: 'validade failed' });
      }

      if (req.userId !== scrap.user_id) {
        return res.status(404).json({ error: 'user is not allowed' });
      }

      const { id, tytle, message } = await scrap.update(req.body);

      return res.json({ id, tytle, message });
    } catch (error) {
      return res.json(error);
    }
  }

  async delete(req, res) {
    try {
      const scrap = await Scrap.findByPk(req.params.id);

      if (!scrap) {
        return res.status(404).json({ error: 'validade failed' });
      }
      if (req.userId !== scrap.user_id) {
        return res.status(404).json({ error: 'user is not allowed' });
      }

      await scrap.destroy();

      return res.status(204).send();
    } catch (error) {
      res.json(error);
    }
  }
}
export default new ScraController();

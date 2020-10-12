import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const userExits = await User.findOne({
        where: { email: req.body.email },
      });
      if (userExits) {
        return res.status(400).json({ error: 'user already exists' });
      }

      const { id, name, email } = await User.create(req.body);

      return res.json({ id, name, email });
    } catch (error) {
      return res.json(error);
    }
  }

  async index(req, res) {
    try {
      const user = await User.findAll({ attributes: ['id', 'name', 'email'] });

      return res.json(user);
    } catch (error) {
      res.json(error);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldpassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const { email, oldPassword } = req.body;
      const user = await User.findByPk(req.userId);
      if (email && email !== user.email) {
        const userExits = await User.findOne({
          where: { email: req.body.email },
        });
        if (userExits) {
          return res.status(400).json({ error: 'user already exists' });
        }
      }
      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Password does not match' });
      }
      const { id, name } = await user.update(req.body);

      return res.json({ id, name, email });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'validade failed' });
      }

      await user.destroy();

      return res.status(204).send();
    } catch (error) {
      res.json(error);
    }
  }
}

export default new UserController();

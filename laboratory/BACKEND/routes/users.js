var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/usersControllers');
const { check } = require('express-validator/check');

const valid_user = [
 check('Nombre', 'El nombre no puede incluir números y su longitud debe ser superior a 3 caracteres')
 .isAlpha(locale = 'es-ES', { ignore: '- /' })
 .isLength({ min: 4 }),
 check('Apellidos', 'Los apellidos no pueden incluir números y su longitud debe ser superior a 3 caracteres')
 .isAlpha(locale = 'es-ES', { ignore: '- /' })
 .isLength({ min: 4 }),
 check('Edad', 'La edad debe ser un número comprendido entre 0 y 125')
 .isFloat({ min: 0, max: 125 }),
 check('DNI', 'El DNI debe ser una cadena alfanumérica de 9 caracteres')
 .isAlphanumeric()
 .isLength({ min: 9, max: 9 }),
 check('Cumpleanos', 'El cumpleaños debe ser una fecha especificada en formato aaaa-mm-dd')
 .isISO8601(),
 check('ColorFavorito', 'El color favorito no puede incluir números y su longitud debe ser superior a 3 caracteres')
 .isAlpha(locale = 'es-ES', { ignore: '- /' })
 .isLength({ min: 4 }),
 check('Sexo', 'El sexo debe ser una cadena de texto comprendida en la siguiente lista: Hombre, Mujer, Otro, No especificado')
 .isIn(['Hombre', 'Mujer', 'Otro', 'No especificado'])
];

/* GET users listing. */
router.get('/', user_controller.users_list);

/* POST create user. */
router.post('/', valid_user, user_controller.users_create);

/* PUT update user. */
router.put('/:id', valid_user, user_controller.users_update_one);

/* DELETE delete user. */
router.delete('/:id', user_controller.users_delete_one);

module.exports = router;

<?php


/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'w9%zvcT!oqN@BQcVe6{w[N0eWZwTsuM#+C;|XJ) $cQ?KB4:RH?0-evBrg~dM=A.' );
define( 'SECURE_AUTH_KEY',  'vM;>rkc<qu.2b=;f_Pkw9x}/vTi2<O54,Wc?UmSQ1|l!,zuY1]o#CvE$,XJ`S&rq' );
define( 'LOGGED_IN_KEY',    '/Z Q D? vs5h5c.;(R9%v4 :E 29Q`T59Bn+I0nZ&C8!v=dyg2iula{dLR}OCMbt' );
define( 'NONCE_KEY',        'ZG_6uwf#nJ#h@~1Ggt<Vsk0n7T&%4Ws:U=zsli@dOG27Kx%l<Ty_nR){hq3[QNF6' );
define( 'AUTH_SALT',        'zs8:9hKjTX!@fi0GLcsy83U17)w?8S`$z|%=%8X8}t,VWZ0K-AHCUt`YU+Oh1R!b' );
define( 'SECURE_AUTH_SALT', 'y/t,-Q+^Bdo8VF*LS<*}H4!nt?sKU&L^`jl=1G9A^VPW[52d^tBhM` GKYbGJD2V' );
define( 'LOGGED_IN_SALT',   'r1*(O|kJel}t|SpteVnOZz_GoV2_-b+!L*?EZ4aqRhh2ZBC(|F b=vwS3!/U<lx;' );
define( 'NONCE_SALT',       'fj)a4:c] s9;b9WrZLr3GLepOTj/X(m>#|pLpM(-!j!FPgJh^&BK/kqAmnjF(d)*' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

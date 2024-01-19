<?php

/**
 * Translation utility
 * Builds a list of all the translation files in
 */
if ( ! isset( $zume_translation_file_list ) && is_admin() ) {

    global $zume_translation_file_list;
    $zume_translation_file_list = [];

    $dir = scandir( __DIR__ );
    foreach ( $dir as $file ){
        if ( 'php' === substr( $file, -3, 3 ) && 'index.php' !== $file && 'loader.php' !== $file && substr( $file, 0, 1 ) !== '.' ) {
            $zume_translation_file_list[] =  __DIR__ . '/' . $file;
        }
        if ( 'index.php' !== $file && 'loader.php' !== $file && substr( $file, 0, 1 ) !== '.' && is_dir( __DIR__ . '/' . $file ) ) {
            $subdir = scandir( __DIR__ . '/'. $file );
            foreach ( $subdir as $subfile ){
                if ( 'php' === substr( $subfile, -3, 3 ) && 'index.php' !== $subfile && 'loader.php' !== $subfile && substr( $subfile, 0, 1 ) !== '.' ) {
                    $zume_translation_file_list[] = __DIR__ . '/'. $file . '/' . $subfile ;
                }
                if ( substr( $subfile, 0, 1 ) !== '.' && is_dir( __DIR__ . '/'. $file . '/' . $subfile ) ) {
                    $subsubdir = scandir( __DIR__ . '/'. $file . '/' . $subfile );
                    foreach ( $subsubdir as $subsubfile ){
                        if ( 'php' === substr( $subsubfile, -3, 3 ) && 'index.php' !== $subsubfile && 'loader.php' !== $subsubfile && substr( $subsubfile, 0, 1 ) !== '.' ) {
                            $zume_translation_file_list[] =  __DIR__ . '/'. $file . '/' . $subfile . '/' . $subsubfile;
                        }
                    }
                }
            }
        }
    }
}

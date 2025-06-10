<?php
/**
 * Footer hooks and functions
 * 
 * @package Digital Newspaper
 * @since 1.0.0
 */
use Digital_Newspaper\CustomizerDefault as DN;

if( ! function_exists( 'digital_newspaper_footer_widgets_area_part' ) ) :
   /**
    * Footer widgets area
    * 
    * @since 1.0.0
    */
   function digital_newspaper_footer_widgets_area_part() {
        $footer_widget_column = DN\digital_newspaper_get_customizer_option( 'footer_widget_column' );
    ?>
            <div class="footer-widget <?php echo esc_attr( $footer_widget_column ); ?>">
                <?php
                    if( ! is_active_sidebar( 'footer-sidebar--column-1' ) ) {
                        dynamic_sidebar( esc_html__( 'Footer Sidebar - Column 1', 'digital-newspaper' ) );
                    } else {
                        dynamic_sidebar( 'footer-sidebar--column-1' );
                    }
                ?>
            </div>
        <?php
            if( $footer_widget_column !== 'column-one' ) {
            ?>
                <div class="footer-widget <?php echo esc_attr( $footer_widget_column ); ?>">
                    <?php
                        if( ! is_active_sidebar( 'footer-sidebar--column-2' ) ) {
                            dynamic_sidebar( esc_html__( 'Footer Sidebar - Column 2', 'digital-newspaper' ) );
                        } else {
                            dynamic_sidebar( 'footer-sidebar--column-2' );
                        }
                    ?>
                </div>
        <?php
            }

            if( $footer_widget_column === 'column-four' || $footer_widget_column === 'column-three' ) {
            ?>
                <div class="footer-widget <?php echo esc_attr( $footer_widget_column ); ?>">
                    <?php
                        if( ! is_active_sidebar( 'footer-sidebar--column-3' ) ) {
                            dynamic_sidebar( esc_html__( 'Footer Sidebar - Column 3', 'digital-newspaper' ) );
                        } else {
                            dynamic_sidebar( 'footer-sidebar--column-3' );
                        }
                    ?>
                </div>
        <?php
            }

            if( $footer_widget_column === 'column-four' ) {
                ?>
                    <div class="footer-widget <?php echo esc_attr( $footer_widget_column ); ?>">
                        <?php
                            if( ! is_active_sidebar( 'footer-sidebar--column-4' ) ) {
                                dynamic_sidebar( esc_html__( 'Footer Sidebar - Column 4', 'digital-newspaper' ) );
                            } else {
                                dynamic_sidebar( 'footer-sidebar--column-4' );
                            }
                        ?>
                    </div>
        <?php
            }
   }
   add_action( 'digital_newspaper_footer_hook', 'digital_newspaper_footer_widgets_area_part', 10 );
endif;

if( ! function_exists( 'digital_newspaper_get_background_and_cursor_animation' ) ) :
    /**
     * Renders html for cursor and background animation
     * 
     * @since 1.1.17
     */
    function digital_newspaper_get_background_and_cursor_animation() {
        $background_animation_option = DN\digital_newspaper_get_customizer_option( 'background_animation_option' );
        if( $background_animation_option ) digital_newspaper_shooting_star_animation_html();
        $cursor_animation = DN\digital_newspaper_get_customizer_option( 'cursor_animation' );
        $cursorclass = 'digital-newspaper-cursor';
        if( $cursor_animation != 'none' ) $cursorclass .= ' type--' . $cursor_animation;
        if( in_array( $cursor_animation, [ 'one', 'two' ] ) ) echo '<div class="'. esc_attr( $cursorclass ) .'"></div>';
    }
    add_action( 'digital_newspaper_animation_hook', 'digital_newspaper_get_background_and_cursor_animation' );
 endif;

 if( ! function_exists( 'digital_newspaper_shooting_star_animation_html' ) ) :
    /**
     * Background animation one
     * 
     * @package Digital Newspaper Pro
     * @since 1.1.17
     */
    function digital_newspaper_shooting_star_animation_html() {
        ?>
            <div class="digital-newspaper-background-animation">
                <?php
                    for( $i = 0; $i < 13; $i++ ) :
                        echo '<span class="item"></span>';
                    endfor;
                ?>
            </div><!-- .digital-newspaper-background-animation -->
        <?php
    }
endif;
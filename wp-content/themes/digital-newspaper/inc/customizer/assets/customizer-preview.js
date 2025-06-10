/* global wp, jQuery */
/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ ) {
	const themeContstants = {
		prefix: 'digital_newspaper_'
	}
	const { totalCats, ajaxUrl, _wpnonce } = digitalNewspaperPreviewObject
	const themeCalls = {
		digitalNewspaperGenerateStyleTag: function( code, id ) {
			if( code ) {
				if( $( "head #" + id ).length > 0 ) {
					$( "head #" + id ).html( code )
				} else {
					$( "head" ).append( '<style id="' + id + '">' + code + '</style>' )
				}
			} else {
				$( "head #" + id ).remove()
			}
		},
		digitalNewspaperGenerateTypoCss: function( selector, value ) {
			const { font_family, font_weight, text_transform, text_decoration, font_size, line_height, letter_spacing } = value
			let cssCode = ''
			cssCode += '.digital_newspaper_font_typography { \n'
			if( font_family ) cssCode += selector + '-family: ' + this.digitalNewspaperGetTypographyFormat( font_family.value, '-family' ) + ';\n'

			if( font_weight ) cssCode += selector + '-weight: ' + this.digitalNewspaperGetTypographyFormat( font_weight.value, '-weight' ) + ';\n'
			
			if( text_transform ) cssCode += selector + '-texttransform: ' + this.digitalNewspaperGetTypographyFormat( text_transform, '-texttransform' ) + ';\n'

			if( text_decoration ) cssCode += selector + '-textdecoration: ' + this.digitalNewspaperGetTypographyFormat( text_decoration, '-textdecoration' ) + ';\n'

			if( font_size ) {
				if( font_size.desktop ) cssCode += selector + '-size: ' + this.digitalNewspaperGetTypographyFormat( font_size.desktop, '-size' ) + ';\n'
				if( font_size.tablet ) cssCode += selector + '-size-tab: ' + this.digitalNewspaperGetTypographyFormat( font_size.tablet, '-size-tab' ) + ';\n'
				if( font_size.smartphone ) cssCode += selector + '-size-mobile: ' + this.digitalNewspaperGetTypographyFormat( font_size.smartphone, '-size-mobile' ) + ';\n'
			}
			if( line_height ) {
				if( line_height.desktop ) cssCode += selector + '-lineheight: ' + this.digitalNewspaperGetTypographyFormat( line_height.desktop, '-lineheight' ) + ';\n'
				if( line_height.tablet ) cssCode += selector + '-lineheight-tab: ' + this.digitalNewspaperGetTypographyFormat( line_height.tablet, '-lineheight-tab' ) + ';\n'
				if( line_height.smartphone ) cssCode += selector + '-lineheight-mobile: ' + this.digitalNewspaperGetTypographyFormat( line_height.smartphone, '-lineheight-mobile' ) + ';\n'
			}
			if( letter_spacing ) {
				if( letter_spacing.desktop ) cssCode += selector + '-letterspacing: ' + this.digitalNewspaperGetTypographyFormat( letter_spacing.desktop, '-letterspacing' ) + ';\n'
				if( letter_spacing.tablet ) cssCode += selector + '-letterspacing-tab: ' + this.digitalNewspaperGetTypographyFormat( letter_spacing.tablet, '-letterspacing-tab' ) + ';\n'
				if( letter_spacing.smartphone ) cssCode += selector + '-letterspacing-mobile: ' + this.digitalNewspaperGetTypographyFormat( letter_spacing.smartphone, '-letterspacing-mobile' ) + ';\n'
			}
			cssCode += '}'
			return cssCode
		},
		digitalNewspaperGenerateTypoCssWithSelector: function( selector, value ) {
			const { font_family, font_weight, text_transform, text_decoration, font_size, line_height, letter_spacing } = value
			let cssCode = ''
			if( font_family ) cssCode += selector + ' { font-family: ' + this.digitalNewspaperGetTypographyFormat( font_family.value, '-family' ) + '; } \n'

			if( font_weight ) cssCode += selector + ' { font-weight: ' + this.digitalNewspaperGetTypographyFormat( font_weight.value, '-weight' ) + ';\n'

			if( text_transform ) cssCode += selector + ' { text-transform: ' + this.digitalNewspaperGetTypographyFormat( text_transform, '-texttransform' ) + '; } \n'
			
			if( text_decoration ) cssCode += selector + ' { text-decoration: ' + this.digitalNewspaperGetTypographyFormat( text_decoration, '-textdecoration' ) + '; } \n'

			if( font_size ) {
				if( font_size.desktop ) cssCode += selector + ' { font-size: ' + this.digitalNewspaperGetTypographyFormat( font_size.desktop, '-size' ) + '; } \n'
				if( font_size.tablet ) cssCode += '@media(max-width: 940px) { ' + selector + ' { font-size: ' + this.digitalNewspaperGetTypographyFormat( font_size.tablet, '-size-tab' ) + '; } } \n'
				if( font_size.smartphone ) cssCode += '@media(max-width: 610px) { ' + selector + ' { font-size: ' + this.digitalNewspaperGetTypographyFormat( font_size.smartphone, '-size-mobile' ) + '; } } \n'
			}
			if( line_height ) {
				if( line_height.desktop ) cssCode += selector + ' { line-height: ' + this.digitalNewspaperGetTypographyFormat( line_height.desktop, '-lineheight' ) + '; } \n'
				if( line_height.tablet ) cssCode += '@media(max-width: 940px) { ' + selector + ' { line-height: ' + this.digitalNewspaperGetTypographyFormat( line_height.tablet, '-lineheight-tab' ) + '; } } \n'
				if( line_height.smartphone ) cssCode += '@media(max-width: 610px) { ' + selector + ' { line-height: ' + this.digitalNewspaperGetTypographyFormat( line_height.smartphone, '-lineheight-mobile' ) + '; } } \n'
			}
			if( letter_spacing ) {
				if( letter_spacing.desktop ) cssCode += selector + ' { letter-spacing: ' + this.digitalNewspaperGetTypographyFormat( letter_spacing.desktop, '-letterspacing' ) + '; } \n'
				if( letter_spacing.tablet ) cssCode += '@media(max-width: 940px) { ' + selector + ' { letter-spacing: ' + this.digitalNewspaperGetTypographyFormat( letter_spacing.tablet, '-letterspacing-tab' ) + '; } } \n'
				if( letter_spacing.smartphone ) cssCode += '@media(max-width: 610px) { ' + selector + ' { letter-spacing: ' + this.digitalNewspaperGetTypographyFormat( letter_spacing.smartphone, '-letterspacing-mobile' ) + '; } } \n'
			}
			return cssCode
		},
		digitalNewspaperGetTypographyFormat: function( value, suffix ) {
			let unitsArray = [ '-size', '-size-tab', '-size-mobile', '-lineheight', '-lineheight-tab', '-lineheight-mobile', '-letterspacing', '-letterspacing-tab', '-letterspacing-mobile' ]
			return ( unitsArray.includes( suffix ) ) ? value + 'px' : value;
			
		}
	}

	// constants
	const ajaxFunctions = {
		typoFontsEnqueue: function( typography ) {
			const { font_family, font_weight } = typography
			let linkTag = document.getElementById('digital-newspaper-generated-typo-fonts')
			let googleFontsUrl = 'https://fonts.googleapis.com/css2?'
			let googleFontsUrlQuery
			let fontStyle = 'wght@'
			if( linkTag !== null ) {
				let parser = new URL( linkTag.href )
				let query = parser.search
				let toAppend = parseTheFontsQuery( query, typography )
				linkTag.href = googleFontsUrl + toAppend
			} else {
				let newLinkTag = document.createElement('link')
				newLinkTag.rel = 'stylesheet'
				newLinkTag.id = 'digital-newspaper-generated-typo-fonts'
				googleFontsUrlQuery = 'family=' + font_family.value + ':' + fontStyle + font_weight.value
				newLinkTag.href = googleFontsUrl + googleFontsUrlQuery
				document.head.appendChild( newLinkTag );
			}
		}
	}

	/**
     * Append new font family 
     * 
     * @since 1.1.15
     */
    const parseTheFontsQuery = ( query, typography ) => {
        const { font_weight:WEIGHT, font_family:FAMILY } = typography
        let toParse = query
        let removeQuestionMark = toParse.replaceAll( '?', '' )
        let filteredQuery = removeQuestionMark.replaceAll( '&', '' )
        let fontFamilyQuery = filteredQuery.split( 'family=' )
        let fontStyleProperty = 'wght'
        var fontFamily = [ FAMILY.value ], fontWeight = { [FAMILY.value]: [ WEIGHT.value ] }, fontStyle = { [FAMILY.value]: [ fontStyleProperty ]}
		let filteredFamily = fontFamily.map(( current ) => {
			return current.replaceAll( '%20', ' ' )
		})
        fontFamilyQuery.forEach(( current ) => {
            if( current !== '' ) {
                let splitFamily = current.split( ':' )
                let family = splitFamily[0]
                if ( ! filteredFamily.includes( family ) ) filteredFamily.push( family );
                let splitWeightAndStyle = splitFamily[1].split('@')
                let weight = splitWeightAndStyle[1].replaceAll( '0,', '' ).replaceAll( '1,', '' ).replaceAll( ',', '' )
                let style = splitWeightAndStyle[0]
                if ( ! fontWeight[family] ) fontWeight[family] = []
                if ( ! fontStyle[family] ) fontStyle[family] = []
                if ( ! fontStyle[family].includes( style ) ) fontStyle[family].push( ...style.split(',') );
				
                if ( ! fontWeight[family].includes( weight ) ) fontWeight[family].push( ...weight.split(';') );
            }
        })
        let toAppend = filteredFamily.map(( family ) => {
			let sortedWeights = fontWeight[family].sort(( first, second ) => { return first - second })
			let duplicateRemovedWeights =  [ ...new Set( sortedWeights ) ]	//weights
			let duplicateRemovedStyles =  [ ...new Set( fontStyle[family] ) ]	// styles
			var structuredFontStyles, temporaryStyles = []
			if( duplicateRemovedStyles.includes( 'ital' ) ) {
				duplicateRemovedWeights.forEach(( current ) => { 
					if( current !== undefined && current !== '' ) temporaryStyles.push( '0,' + current + ';' )
				})
				duplicateRemovedWeights.forEach(( current, index ) => { 
					if( current !== undefined && current !== '' ) temporaryStyles.push( '1,' + current + ( index + 1 === duplicateRemovedWeights.length ? '' : ';' ) )
				})
				structuredFontStyles = temporaryStyles.join('')
			} else {
				structuredFontStyles = duplicateRemovedWeights.join(';')
			}
            return 'family=' + family + ':' + duplicateRemovedStyles.sort() + '@' + structuredFontStyles
        }).join('&')
        return toAppend;
    }

	const DNControls = {
		color( obj = {} ){
			let { controlId, selector, styleId, isVariable = true, property = 'color' } = obj
			wp.customize( controlId, function( value ) {
				value.bind( function( to ) {
					let cssCode = ''
					if( isVariable ) {
						cssCode = 'body.digital_newspaper_font_typography { '+ selector +': ' + helperFunctions.getFormatedColor( to ) + ' }'
					} else {
						cssCode = selector + ' { '+ property +': ' + helperFunctions.getFormatedColor( to ) + ' }'
					}
					themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-' + styleId )
				});
			});
		},
		solidGradientImage( obj = {} ){
			let { controlId, selector, styleId, isVariable = false } = obj
			wp.customize( controlId, function( value ) {
				value.bind( function( to ) {
					let parsedTo = JSON.parse( to ),
						cssCode = selector + ' {\n';

					if( ! isVariable ) {
						switch( parsedTo.type ) {
							case 'image' : 
									let { repeat = 'no-repeat', position = 'left top', attachment = 'fixed', size = 'auto'  } = parsedTo
									if( 'media_id' in parsedTo.image ) cssCode += 'background-image: url(' + parsedTo.image.media_url + ');\n'
									cssCode += " background-repeat: "+ repeat + ';\n'
									cssCode += " background-position: "+ position + ';\n'
									cssCode += " background-attachment: "+ attachment + ';\n'
									cssCode += " background-size: "+ size + ';\n'
									cssCode += '}'
								break;
							default: 
									if( 'type' in parsedTo ) cssCode += "background: " + helperFunctions.getFormatedColor( parsedTo[parsedTo.type] ) + ';\n}'
								break;
						}
					} else {
						cssCode = `body.digital_newspaper_main_body{ ${ selector }: ${ helperFunctions.getFormatedColor( parsedTo[parsedTo.type] ) } };\n`
					}
					themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-' + styleId )
				});
			});
		},
		typography( obj = {} ){
			let { controlId, selector, styleId } = obj
			wp.customize( controlId, function( value ) {
				value.bind( function( to ) {
					ajaxFunctions.typoFontsEnqueue( to )
					let cssCode = themeCalls.digitalNewspaperGenerateTypoCss( selector, to )
					themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-' + styleId )
				})
			})
		},
		responsiveSlider( obj = {} ) {
			let { controlId, selector, styleId, property, isVariable = false } = obj
			wp.customize( controlId, function( value ) {
				value.bind( function( to ) {
					let { desktop, tablet, smartphone } = to,
						cssCode = '';

					if( isVariable ) {
						cssCode += '.digital_newspaper_font_typography{\n'
						if( desktop ) cssCode += selector + ": " + desktop + "px;\n";
						if( tablet ) cssCode += selector + "-tablet: " + tablet + "px;\n";
						if( smartphone ) cssCode += selector + "-smartphone: " + smartphone + "px;\n";
						cssCode += '}'
					} else {
						if( desktop ) cssCode += selector + '{' + property +': '+ desktop + 'px }';
						if( tablet ) cssCode += '@media(max-width: 940px) {'+ selector + '{' + property + ': ' + tablet + 'px } }';
						if( smartphone ) cssCode += '@media(max-width: 610px) {'+ selector + '{' + property + ': ' + smartphone + 'px } }';
					}
					themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-' + styleId )
				});
			});
		},
		globalContentLayout( obj = {} ) {
			let { controlId, selector, prefix = 'width-' } = obj
			wp.customize( controlId, function( value ) {
				value.bind( function(to) {
					let container = $( selector )
					container.removeClass( `${ prefix }boxed--layout ${ prefix }full-width--layout` )
					if( to === 'global' ) {
						if( $( 'body' ).hasClass( 'global-content-layout--boxed--layout' ) ) {
							container.addClass( `${ prefix }boxed--layout` )
						} else {
							container.addClass( `${ prefix }full-width--layout` )
						}
					} else {
						container.addClass( prefix + to )
					}
				});
			});
		},
		customCss( obj = {} ) {
			let { controlId, selector, styleId } = obj
			wp.customize( controlId, function( value ) {
				value.bind( function( to ) {
					let cssCode = ''
					if( to ) cssCode += to.replace( "{wrapper}", selector )
					themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-' + styleId )
				})
			})
		},
		toggleClass( obj = {} ) {
			let { controlId, selector = 'body', removeClass, prefix } = obj	
			wp.customize( controlId, function( value ) {
				value.bind( function(to) {
					$( selector ).removeClass( removeClass ).addClass( prefix + to )
				});
			});
		}
	}

	// site block border top
	wp.customize( 'website_block_border_top_option', function( value ) {
		value.bind( function(to) {
			if( to ) {
				$( "body" ).removeClass( "digital_newspaper_site_block_border_top" )
				$( "body" ).addClass( "digital_newspaper_site_block_border_top" )
			} else {
				$( "body" ).removeClass( "digital_newspaper_site_block_border_top" )
			}
		});
	});

	// post title hover class
	DNControls.toggleClass({ controlId: 'post_title_hover_effects', removeClass: "digital-newspaper-title-none digital-newspaper-title-one digital-newspaper-title-two digital-newspaper-title-four", prefix: 'digital-newspaper-title-' })

	// website layout class
	DNControls.toggleClass({ controlId: 'website_layout', removeClass: "site-boxed--layout site-full-width--layout", prefix: 'site-' })

	// block title layouts class
	DNControls.toggleClass({ controlId: 'website_block_title_layout', removeClass: 'block-title--layout-one block-title--layout-two block-title--layout-three block-title--layout-four block-title--layout-five block-title--layout-seven', prefix: 'block-title--' })

	// image hover class
	DNControls.toggleClass({ controlId: 'site_image_hover_effects', removeClass: 'digital-newspaper-image-hover--effect-six', prefix: 'digital-newspaper-image-hover--effect-' })
	
	// site block border top changes
	wp.customize( 'website_block_border_top_color', function( value ) {
		value.bind( function( to ) {
			let selector = '--theme-block-top-border-color',
				parsedTo = JSON.parse( to ),
				cssCode = 'body.digital_newspaper_font_typography { '+ selector +': ' + helperFunctions.getFormatedColor( parsedTo[ parsedTo.type ] ) + ' }';

			themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-website-block-border-top-color' )
		});
	});

	// theme color bind changes
	wp.customize( 'theme_color', function( value ) {
		value.bind( function( to ) {
			let selector = '--theme-color-red',
				cssCode = 'body.digital_newspaper_main_body { '+ selector +': ' + helperFunctions.getFormatedColor( to ) + ' }';

			themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-theme-color' )
		});
	});

	// preset solid bind changes
	DNControls.color({ controlId: 'preset_color_1', selector: '--digital-newspaper-global-preset-color-1', styleId: 'theme-preset-color-1-style' })
	DNControls.color({ controlId: 'preset_color_2', selector: '--digital-newspaper-global-preset-color-2', styleId: 'theme-preset-color-2-style' })
	DNControls.color({ controlId: 'preset_color_3', selector: '--digital-newspaper-global-preset-color-3', styleId: 'theme-preset-color-3-style' })
	DNControls.color({ controlId: 'preset_color_4', selector: '--digital-newspaper-global-preset-color-4', styleId: 'theme-preset-color-4-style' })
	DNControls.color({ controlId: 'preset_color_5', selector: '--digital-newspaper-global-preset-color-5', styleId: 'theme-preset-color-5-style' })
	DNControls.color({ controlId: 'preset_color_6', selector: '--digital-newspaper-global-preset-color-6', styleId: 'theme-preset-color-6-style' })
	DNControls.color({ controlId: 'preset_color_7', selector: '--digital-newspaper-global-preset-color-7', styleId: 'theme-preset-color-7-style' })
	DNControls.color({ controlId: 'preset_color_8', selector: '--digital-newspaper-global-preset-color-8', styleId: 'theme-preset-color-8-style' })
	DNControls.color({ controlId: 'preset_color_9', selector: '--digital-newspaper-global-preset-color-9', styleId: 'theme-preset-color-9-style' })
	DNControls.color({ controlId: 'preset_color_10', selector: '--digital-newspaper-global-preset-color-10', styleId: 'theme-preset-color-10-style' })
	DNControls.color({ controlId: 'preset_color_11', selector: '--digital-newspaper-global-preset-color-11', styleId: 'theme-preset-color-11-style' })
	DNControls.color({ controlId: 'preset_color_12', selector: '--digital-newspaper-global-preset-color-12', styleId: 'theme-preset-color-12-style' })

	// preset gradient bind changes
	DNControls.color({ controlId: 'preset_gradient_1', selector: '--digital-newspaper-global-preset-gradient-color-1', styleId: 'theme-preset-gradient-color-1-style' })
	DNControls.color({ controlId: 'preset_gradient_2', selector: '--digital-newspaper-global-preset-gradient-color-2', styleId: 'theme-preset-gradient-color-2-style' })
	DNControls.color({ controlId: 'preset_gradient_3', selector: '--digital-newspaper-global-preset-gradient-color-3', styleId: 'theme-preset-gradient-color-3-style' })
	DNControls.color({ controlId: 'preset_gradient_4', selector: '--digital-newspaper-global-preset-gradient-color-4', styleId: 'theme-preset-gradient-color-4-style' })
	DNControls.color({ controlId: 'preset_gradient_5', selector: '--digital-newspaper-global-preset-gradient-color-5', styleId: 'theme-preset-gradient-color-5-style' })
	DNControls.color({ controlId: 'preset_gradient_6', selector: '--digital-newspaper-global-preset-gradient-color-6', styleId: 'theme-preset-gradient-color-6-style' })
	DNControls.color({ controlId: 'preset_gradient_7', selector: '--digital-newspaper-global-preset-gradient-color-7', styleId: 'theme-preset-gradient-color-7-style' })
	DNControls.color({ controlId: 'preset_gradient_8', selector: '--digital-newspaper-global-preset-gradient-color-8', styleId: 'theme-preset-gradient-color-8-style' })
	DNControls.color({ controlId: 'preset_gradient_9', selector: '--digital-newspaper-global-preset-gradient-color-9', styleId: 'theme-preset-gradient-color-9-style' })
	DNControls.color({ controlId: 'preset_gradient_10', selector: '--digital-newspaper-global-preset-gradient-color-10', styleId: 'theme-preset-gradient-color-10-style' })
	DNControls.color({ controlId: 'preset_gradient_11', selector: '--digital-newspaper-global-preset-gradient-color-11', styleId: 'theme-preset-gradient-color-11-style' })
	DNControls.color({ controlId: 'preset_gradient_12', selector: '--digital-newspaper-global-preset-gradient-color-12', styleId: 'theme-preset-gradient-color-12-style' })

	// top header styles
	DNControls.solidGradientImage({ controlId: 'top_header_background_color_group', selector: '.digital_newspaper_main_body .site-header.layout--default .top-header', styleId: 'top-header-background-color-group' })

	// Theme Header => Main Header => Design
	DNControls.responsiveSlider({ controlId: 'header_vertical_padding', selector: '--header-padding', styleId: 'header-vertical-padding', property: 'width', isVariable: true })
	DNControls.solidGradientImage({ controlId: 'header_background_color_group', selector: 'body.digital_newspaper_main_body .site-header.layout--default .site-branding-section', styleId: 'header-background-color-group' })

	// Theme Header => Menu Options => Typography
	DNControls.typography({ controlId: 'header_menu_typo', selector: '--menu', styleId: 'header-menu-typo' })
	DNControls.typography({ controlId: 'header_sub_menu_typo', selector: '--submenu', styleId: 'header-sub-menu-typo' })

	// header menu hover effect 
	DNControls.toggleClass({ controlId: 'header_menu_hover_effect', selector: '#site-navigation', removeClass: 'hover-effect--one hover-effect--none', prefix: 'hover-effect--' })

	// logo width
	DNControls.responsiveSlider({ controlId: 'digital_newspaper_site_logo_width', selector: 'body .site-branding img.custom-logo', styleId: 'site-logo-width', property: 'width' })
	
	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title a' ).text( to );
		} );
	});
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	});
	// blog description
	wp.customize( 'blogdescription_option', function( value ) {
		value.bind(function(to) {
			if( to ) {
				$( '.site-description' ).css( {
					clip: 'auto',
					position: 'relative',
				} );
			} else {
				$( '.site-description' ).css( {
					clip: 'rect(1px, 1px, 1px, 1px)',
					position: 'absolute',
				} );
			}
		})
	});

	// Header text color
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title' ).css( {
					clip: 'rect(1px, 1px, 1px, 1px)',
					position: 'absolute',
				} );
			} else {
				$( '.site-title' ).css( {
					clip: 'auto',
					position: 'relative',
				} );
				themeCalls.digitalNewspaperGenerateStyleTag( 'header .site-title a{ color: '+ to +'}', 'digital-newspaper-site-title-color' )
			}
		} );
	});

	// site title hover color
	DNControls.color({ controlId: 'site_title_hover_textcolor', selector: 'header .site-title a:hover', styleId: 'site-title-hover-color', isVariable: false, property: 'color' })

	// site description color
	wp.customize( 'site_description_color', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).css({
				color: to,
			});
		} );
	});

	// site title typo
	DNControls.typography({ controlId: 'site_title_typo', selector: '--site-title', styleId: 'site-title-typo' })
	
	// bottom footer menu option
	wp.customize( 'bottom_footer_menu_option', function( value ) {
		value.bind( function( to ) {
			if( to ) {
				$( '.bottom-footer .bottom-menu' ).show()
			} else {
				$( '.bottom-footer .bottom-menu' ).hide()
			}
		});
	});

	// single post related posts title
	wp.customize( 'single_post_related_posts_title', function( value ) {
		value.bind( function( to ) {
			$( '.single-related-posts-section .digital-newspaper-block-title span' ).text( to );
		} );
	});

	// footer width option
	wp.customize( 'footer_section_width', function( value ) {
		value.bind( function( to ) {
			if( to == 'boxed-width' ) {
				$( 'footer .main-footer' ).removeClass( 'full-width' ).addClass( 'boxed-width' );
				$( 'footer .main-footer .footer-inner' ).removeClass( 'digital-newspaper-container-fluid' ).addClass( 'digital-newspaper-container' );
			} else {
				$( 'footer .main-footer' ).removeClass( 'boxed-width' ).addClass( 'full-width' );
				$( 'footer .main-footer .footer-inner' ).removeClass( 'digital-newspaper-container' ).addClass( 'digital-newspaper-container-fluid' );
			}
		});
	});

	// Single Post => Typography
	DNControls.typography({ controlId: 'single_post_title_typo', selector: '--single-title', styleId: 'single-post-title-typo' })
	DNControls.typography({ controlId: 'single_post_meta_typo', selector: '--single-meta', styleId: 'single-post-meta-typo' })
	DNControls.typography({ controlId: 'single_post_content_typo', selector: '--single-content', styleId: 'single-post-content-typo' })

	// typography 
	DNControls.typography({ controlId: 'site_section_block_title_typo', selector: '--block-title', styleId: 'site-section-block-title-typo' })
	DNControls.typography({ controlId: 'site_archive_post_title_typo', selector: '--post-title', styleId: 'site-archive-post-title-typo' })
	DNControls.typography({ controlId: 'site_archive_post_meta_typo', selector: '--meta', styleId: 'site-archive-post-meta-typo' })
	DNControls.typography({ controlId: 'site_archive_post_content_typo', selector: '--content', styleId: 'site-archive-post-content-typo' })

	// top header custom css
	DNControls.customCss({ controlId: 'top_header_custom_css', selector: '.top-header', styleId: 'top-header-custom-css' })

	// global button custom css
	DNControls.customCss({ controlId: 'read_more_button_custom_css', selector: '.post-element a.post-link-button', styleId: 'global-button-custom-css' })

	// breadcrumb custom css
	DNControls.customCss({ controlId: 'breadcrumb_custom_css', selector: '.digital-newspaper-breadcrumb-wrap', styleId: 'breadcrumb-custom-css' })
	
	// scroll to top custom css
	DNControls.customCss({ controlId: 'scroll_to_top_custom_css', selector: '#digital-newspaper-scroll-to-top', styleId: 'scroll-to-top-custom-css' })

	// site branding custom css
	DNControls.customCss({ controlId: 'site_identity_custom_css', selector: '.site-branding', styleId: 'site-branding-custom-css' })

	// header menu custom css
	DNControls.customCss({ controlId: 'header_menu_custom_css', selector: '#header-menu', styleId: 'header-menu-custom-css' })

	// constants
	const helperFunctions = {
		getFormatedColor: function(color) {
			if( color == null ) return
			if( color.includes('preset') ) {
				return 'var(' + color + ')'
			} else {
				return color
			}
		}
	}

	// Background animation
	wp.customize( 'background_animation_option', function( value ) {
		value.bind( function( to ) {
			$( 'body' ).removeClass( 'background-animation--none background-animation--one background-animation--two background-animation--three' ).addClass( 'background-animation--' + to )
			if( to === 'none' ) {
				$( 'body' ).removeClass( 'background-animation--enabled' )
			} else {
				$( 'body' ).addClass( 'background-animation--enabled' )
			}
		})
	})

	// animation object color
	DNControls.color({ controlId: 'background_animation_object_color', selector: '--digital-newspaper-animation-object-color', styleId: 'animation-object-color' })

	// cursor animation
	wp.customize( 'cursor_animation', function( value ) {
		value.bind( function(to) {
			if( to !== 'none' ) {
				if( $('body .digital-newspaper-cursor').length <= 0 ) {
					$( 'body #page.site' ).append( '<div class="digital-newspaper-cursor"></div>' )
				}
				$('body .digital-newspaper-cursor').removeClass( 'type--one type--two' ).addClass( 'type--' + to )
			} else {
				$('body .digital-newspaper-cursor').removeClass( 'type--one type--two' )
			}
		});
	});

	// scroll to top visibility
	wp.customize( 'stt_responsive_option', function( value ) {
		value.bind( function(to) {
			let { desktop, tablet, mobile } = to,
				cssCode = '';
			if( ! desktop ) cssCode += 'body #digital-newspaper-scroll-to-top.show { display: none }';
			cssCode += `@media(max-width: 940px) { body #digital-newspaper-scroll-to-top.show { display : ${ tablet ? 'block' : 'none' }; } }`
			cssCode += `@media(max-width: 610px) { body #digital-newspaper-scroll-to-top.show { display : ${ mobile ? 'block' : 'none' }; } }`
			themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-stt-responsive-option' )
		});
	});

	// Theme Header => Ads Banner => Ads Banner visibility
	wp.customize( 'header_ads_banner_responsive_option', function( value ) {
		value.bind( function(to) {
			let { desktop, tablet, mobile } = to,
				cssCode = '';
			if( ! desktop ) cssCode += 'body .after-header .ads-banner { display: none }';
			cssCode += `@media(max-width: 940px) { body .after-header .ads-banner { display : ${ tablet ? 'block' : 'none' }; } }`
			cssCode += `@media(max-width: 610px) { body .after-header .ads-banner { display : ${ mobile ? 'block' : 'none' }; } }`
			themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-header-ads-banner-responsive-option' )
		});
	});

	// Main Header => Width Layout
	DNControls.toggleClass({ controlId: 'header_width_layout', removeClass: 'header-width--contain header-width--full-width', prefix: 'header-width--' })

	// Theme Footer => Section Width
	wp.customize( 'footer_section_width', function( value ) {
		value.bind( function(to) {
			let footer = $( 'body .site-footer' )
			footer.removeClass( 'full-width boxed-width' ).addClass( to )
			footer.find( '.footer-inner' ).removeClass( 'digital-newspaper-container digital-newspaper-container-fluid' ).addClass( to === 'boxed-width' ? 'digital-newspaper-container' : 'digital-newspaper-container-fluid' ) 
		});
	});

	// Global => Website Layout => Website Content Global Layout
	wp.customize( 'website_content_layout', function( value ) {
		value.bind( function(to) {
			$( 'body' ).removeClass( 'global-content-layout--boxed--layout global-content-layout--full-width--layout' ).addClass( 'global-content-layout--' + to )
			// Ticker News
			if( wp.customize( 'ticker_news_width_layout' ).get() === 'global' ) $( 'body .after-header' ).removeClass( 'ticker-news-section--boxed--layout ticker-news-section--full-width--layout' ).addClass( 'ticker-news-section--' + to )
			// Main Banner
			if( wp.customize( 'main_banner_width_layout' ).get() === 'global' ) $( '#main-banner-section' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Front Section => Full Width
			if( wp.customize( 'full_width_blocks_width_layout' ).get() === 'global' ) $( '#full-width-section' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Front Section => Left Content -Right Sidebar => Width Layouts
			if( wp.customize( 'leftc_rights_blocks_width_layout' ).get() === 'global' ) $( '#leftc-rights-section' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Front Section => Left Sidebar -Right Content => Width Layouts
			if( wp.customize( 'lefts_rightc_blocks_width_layout' ).get() === 'global' ) $( '#lefts-rightc-section' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Front Section => Bottom Full Width => Width Layouts
			if( wp.customize( 'bottom_full_width_blocks_width_layout' ).get() === 'global' ) $( '#bottom-full-width-section' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Bottom Footer => Width Layouts
			if( wp.customize( 'bottom_footer_width_layout' ).get() === 'global' ) $( 'body .bottom-footer' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Blog / Archive / Single => Blog / Archive => Width Layouts
			if( wp.customize( 'archive_width_layout' ).get() === 'global' ) $( '.archive #primary.site-main, .home #primary.site-main' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Blog / Archive / Single => Single Post => Width Layouts
			if( wp.customize( 'single_post_width_layout' ).get() === 'global' ) $( '.single #primary.site-main' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Pages => Page => Width Layouts
			if( wp.customize( 'single_page_width_layout' ).get() === 'global' ) $( '.page #primary.site-main' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Pages => 404 => Width Layouts
			if( wp.customize( 'error_page_width_layout' ).get() === 'global' ) $( '.error404 #primary.site-main' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
			// Pages => Search Page => Width Layouts
			if( wp.customize( 'search_page_width_layout' ).get() === 'global' ) $( '.search #primary.site-main' ).removeClass( 'width-boxed--layout width-full-width--layout' ).addClass( 'width-' + to )
		});
	});

	// Global => Website Layout => Website Content Global Layout
	DNControls.globalContentLayout({ controlId: 'ticker_news_width_layout', selector: 'body .after-header', prefix: 'ticker-news-section--' })
	// Main Banner => Width Layouts
	DNControls.globalContentLayout({ controlId: 'main_banner_width_layout', selector: '#main-banner-section' })
	// Front Section => Full Width => Width Layouts
	DNControls.globalContentLayout({ controlId: 'full_width_blocks_width_layout', selector: '#full-width-section' })
	// Front Section => Left Content -Right Sidebar => Width Layouts
	DNControls.globalContentLayout({ controlId: 'leftc_rights_blocks_width_layout', selector: '#leftc-rights-section' })
	// Front Section => Left Sidebar -Right Content => Width Layouts
	DNControls.globalContentLayout({ controlId: 'lefts_rightc_blocks_width_layout', selector: '#lefts-rightc-section' })
	// Front Section => Bottom Full Width => Width Layouts
	DNControls.globalContentLayout({ controlId: 'bottom_full_width_blocks_width_layout', selector: '#bottom-full-width-section' })
	// Bottom Footer => Width Layouts
	DNControls.globalContentLayout({ controlId: 'bottom_footer_width_layout', selector: 'body .bottom-footer' })
	// Blog / Archive / Single => Blog / Archive => Width Layouts
	DNControls.globalContentLayout({ controlId: 'archive_width_layout', selector: '.archive #primary.site-main, .home #primary.site-main' })
	// Blog / Archive / Single => Single Post => Width Layouts
	DNControls.globalContentLayout({ controlId: 'single_post_width_layout', selector: '.single #primary.site-main' })
	// Pages => Page => Width Layouts
	DNControls.globalContentLayout({ controlId: 'single_page_width_layout', selector: '.page #primary.site-main' })
	// Pages => 404 => Width Layouts
	DNControls.globalContentLayout({ controlId: 'error_page_width_layout', selector: '.error404 #primary.site-main' })
	// Pages => Search Page => Width Layouts
	DNControls.globalContentLayout({ controlId: 'search_page_width_layout', selector: '.search #primary.site-main' })

	// Site Background Color
	DNControls.solidGradientImage({ controlId: 'site_background_color', selector: '--site-bk-color', styleId: 'top-header-background-color-group', isVariable: true })

	// Category Colors
	if( totalCats ) {
		let parsedCats = Object.keys( totalCats ).map( key=> totalCats[key] )
		parsedCats.forEach(function( item ) {
			let termId = parseInt( item.term_id )
			wp.customize( 'category_' + termId + '_color', function( value ) {
				value.bind( function( to ) {
					let cssCode = '',
						{ color, hover } = to;

					cssCode += "body .post-categories .cat-item.cat-" + termId + " { background-color : " + helperFunctions.getFormatedColor( color ) + "} ";
					cssCode += "body .post-categories .cat-item.cat-" + termId + ":hover { background-color : " +helperFunctions.getFormatedColor( hover ) + "} ";
					cssCode += "body .digital-newspaper-category-no-bk .post-categories .cat-item.cat-" + termId + " a { color : " + helperFunctions.getFormatedColor( color ) + "} ";
					cssCode += "body .digital-newspaper-category-no-bk .post-categories .cat-item.cat-" + termId + " a:hover { color : " + helperFunctions.getFormatedColor( hover ) + ";} ";
					themeCalls.digitalNewspaperGenerateStyleTag( cssCode, 'digital-newspaper-category-' + termId + '-style' )
				})
			})
		})
	}

	// Bottom Footer => Show / Hide
	wp.customize( 'bottom_footer_option', function( value ) {
		value.bind( function( to ) {
			let container = $( 'footer.site-footer .bottom-footer' )
			to ? container.show() : container.hide()
		})
	})

	// Main Banner => Popular Posts Title
	wp.customize( 'main_banner_popular_posts_title', function( value ) {
		value.bind( function( to ) {
			$( '#main-banner-section.banner-layout--two .main-banner-popular-posts .section-title' ).text( to )
		})
	})

	// frontpage sidebar sticky
	wp.customize( 'frontpage_sidebar_sticky_option', function( value ) {
		value.bind( function(to) {
			if( to ) {
				if( $('body').hasClass( 'home' ) && $('body').hasClass( 'page-template-default' ) ) $( "body" ).addClass( "sidebar-sticky" )
			} else {
				if( $('body').hasClass( 'home' ) && $('body').hasClass( 'page-template-default' ) )  $( "body" ).removeClass( "sidebar-sticky" )
			}
		});
	});

	// archive sidebar sticky
	wp.customize( 'archive_sidebar_sticky_option', function( value ) {
		value.bind( function(to) {
			if( to ) {
				if( ( $('body').hasClass( 'home' ) && $('body').hasClass( 'blog' ) ) || $('body').hasClass( 'archive' ) ) $( "body" ).addClass( "sidebar-sticky" )
			} else {
				if( ( $('body').hasClass( 'home' ) && $('body').hasClass( 'blog' ) ) || $('body').hasClass( 'archive' ) ) $( "body" ).removeClass( "sidebar-sticky" )
			}
		});
	});

	// Single sidebar sticky
	wp.customize( 'single_sidebar_sticky_option', function( value ) {
		value.bind( function(to) {
			if( to ) {
				if( $('body').hasClass( 'single' ) ) $( "body" ).addClass( "sidebar-sticky" )
			} else {
				if( $('body').hasClass( 'single' ) ) $( "body" ).removeClass( "sidebar-sticky" )
			}
		});
	});

	// page sidebar stickys
	wp.customize( 'page_sidebar_sticky_option', function( value ) {
		value.bind( function(to) {
			if( to ) {
				if( $('body').hasClass( 'page' ) ) $( "body" ).addClass( "sidebar-sticky" )
			} else {
				if( $('body').hasClass( 'page' ) ) $( "body" ).removeClass( "sidebar-sticky" )
			}
		});
	});
}( jQuery ) );
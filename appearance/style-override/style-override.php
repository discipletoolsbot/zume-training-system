<?php

/**
 * Zúme style override
 */
add_action( 'wp_head', function(){
    ?>
    <style>
        body {
            background-color: white !important;
        }
        header {
            border-bottom: 0 !important;
        }
        .top-bar a {
            color: #323A68;
        }
        .top-bar .active a {
            color: white;
        }
        .top-bar {
            background-color: white;
        }
        .top-bar-menu {
            border-bottom: 1px solid #323A68 !important;
        }

        .top-bar, .top-bar ul {
            background-color: white;
        }
        #top-bar-menu .dropdown.menu .image-menu-nav  {
            background-color: white ;
        }
        #top-bar-menu .dropdown.menu a  {
            /*background-color: white;*/
        }
        #top-bar-menu .has-submenu.center-items.is-dropdown-submenu-parent button img {
            background-color: white;
            border-radius: 20px;
        }
        #top-bar-menu .image-menu-nav a img {
            background-color: inherit;
            border-radius: 20px;
        }

        #top-bar-menu .dropdown.menu li a {
            background-color: white;
        }

        #top-bar-menu ul.dropdown.menu li.active li.is-dropdown-submenu-item a {
            background-color: white;
            color: #323A68;
        }
        .menu ul {
            list-style: none;
            list-style-position: outside;
            list-style-type: none;
        }
        #top-bar-menu a {
            color: #323A68;
        }
        #top-bar-menu .is-dropdown-submenu-parent a {
            color: white;
        }
        #top-bar-menu a:hover {
            color: white;
        }
        #top-bar-menu .dropdown.menu li a {
            color: #323A68;
            background-color: white;
        }
        #top-bar-menu .dropdown.menu li a:hover {
            color: white;
            background-color:  #323A68;
        }
        #top-bar-menu div.top-bar-left .dropdown.menu li.active > a {
            color:white;
        }
        #top-bar-menu .top-bar-left .dropdown.menu > li.is-dropdown-submenu-parent > a::after {
            border-color: #323A68 transparent transparent;
        }

        #top-bar-menu .image-menu-nav a img {
            background-color: inherit;
            border-radius: 20px;
        }
        .js-typeahead-assigned_to {
            color: black !important;
        }
    </style>
    <script>
        jQuery(document).ready(function(){
            jQuery('#top-bar-menu img.dt-white-icon').addClass('dt-dark-icon').removeClass('dt-white-icon')
            jQuery('.fi-web').css("color", "black")
        })
    </script>
    <?php
}, 1000 );

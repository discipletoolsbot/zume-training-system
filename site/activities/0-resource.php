<?php

function zume_activities_css() {
    ?>
    <script>
        jQuery(document).ready(function($){
            document.cookie = "zume_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "pll_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
    </script>
    <style>
        .zume-activity {
            padding: 1em;
            max-width: 800px;
            width:100%;
            margin: 0 auto;
        }
        .zume-activity-header {
            text-align: center;
        }
        .zume-activity-content {
            max-width: 600px;
            margin: 0 auto;
        }
        .zume-activity-content ul {
            list-style: none;
            padding: 0;
        }
        .zume-activity-content ul li {
            margin-bottom: 10px;
        }
    </style>
    <?php
}

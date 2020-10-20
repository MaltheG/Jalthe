<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="Malthe Glent-Madsen">

    <title>Jalthe</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles -->
    <link href="css/scrolling-nav.css" rel="stylesheet">
    <link href="css/codestyle.css" rel="stylesheet">

    <!-- higlight.js style -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/androidstudio.min.css">

    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <script src="js/tabs.js"></script>

</head>

<body id="page-top">
<div class="atmos-wrapper">
    <canvas id="canvas" width="1000" height="1000"></canvas>
</div>
<div id="content">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">Jalthe</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#jotunn">Jotunn</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link js-scroll-trigger" href="#jalthe">Website</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <section id="about">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mx-auto text-white text-center">
                    <h1 class="punch">Hello.</h1>
                </div>
                <div class="col-lg-6 mx-auto bounding">
                    <p class="lead">My name is Malthe and I'm a Computer Science Student at Aarhus University. My main interests are Machine Learning and Distributed Systems although I'm down to do anything that piques my interest. I mainly program in Java, Python, Javascript and a bit of C. This page functions as my playground and portfolio where some of my spare time projects are highlighted. If you wish to contact me, you can do so on dev@jalthe.com</p>
                </div>
            </div>
        </div>
    </section>

    <section id="jotunn">
        <div class="container">
            <div class="row">
                <div class="col-lg-7 mx-auto cdisplay">
                    <?php
                    $repname = "Jotunn";
                    $repo = "https://raw.githubusercontent.com/MaltheG/" . $repname . "/master/";
                    $files = file($repo . "demo",FILE_IGNORE_NEW_LINES);

                    echo "<div class=\"tab\" id=\"tabContainer\">";

                    foreach($files as $file) {
                        echo "<button class=\"tablinks link_" . $repname . "\" onclick=\"openFile(event, '" . $file . "', '" .  $repname . "')\">" . $file . "</button>";
                    }
                    unset($file);

                    echo "</div>";

                    foreach($files as $file) {
                        $contents = file_get_contents($repo . $file);
                        echo "<div id=" . $file . " class=\"tabcontent content_" . $repname . "\"
                                ><pre
                                    ><code class='h-100' id='codeArea'>" . $contents . "</code
                                ></pre
                            ></div>";
                    }
                    ?>
                </div>
                <div class="col-lg-4 mx-auto bounding">
                    <h2>Jotunn</h2>
                    <p class="lead">Jotunn is a custom made discord bot which has features that include music playing and custom name changing.</p>
                    <p class="lead">Jotunn is developed in Javascript and made to be run on a Node.js server.</p>
                    <p class="lead">Jotunn is constantly in development, full of bugs and never polished.</p>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary btn-lg text-center" onclick="window.location.href='https://github.com/MaltheG/Jotunn'">View on Github</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="jalthe">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mx-auto bounding">
                    <h2>Jalthe.com</h2>
                    <p class="lead">Jalthe.com is the website you're on right now. Hooray!</p>
                    <p class="lead">It uses highlight.js for code styling. A javascript simulation running in the background and a bit of PHP to load code sources directly from Github.</p>
                    <div class="text-center">
                        <button type="button" class="btn btn-primary btn-lg text-center" onclick="window.location.href='https://github.com/MaltheG/Jalthe'">View on Github</button>
                    </div>
                </div>
                <div class="col-lg-7 mx-auto cdisplay">
                    <?php
                    $repname = "Jalthe";
                    $repo = "https://raw.githubusercontent.com/MaltheG/" . $repname . "/main/";
                    $files = file($repo . "demo",FILE_IGNORE_NEW_LINES);

                    echo "<div class=\"tab\" id=\"tabContainer\">";

                    foreach($files as $file) {
                        echo "<button class=\"tablinks link_" . $repname . "\" onclick=\"openFile(event, '" . $file . "', '" .  $repname . "')\">" . $file . "</button>";
                    }
                    unset($file);

                    echo "</div>";

                    foreach($files as $file) {
                        $contents = file_get_contents($repo . $file);
                        $contents = str_replace("<", "&lt;", $contents);
                        $contents = str_replace(">", "&gt;", $contents);
                        echo "<div id=" . $file . " class=\"tabcontent content_" . $repname . "\"
                                ><pre
                                    ><code class='h-100' id='codeArea'>" . $contents . "</code
                                ></pre
                            ></div>";
                    }
                    ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-5 bg-dark">
        <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; Jalthe.com 2020</p>
        </div>
        <!-- /.container -->
    </footer>

    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom JavaScript for this theme -->
    <script src="js/scrolling-nav.js"></script>
    <script src="droplets.js"></script>
</div>
</body>

</html>

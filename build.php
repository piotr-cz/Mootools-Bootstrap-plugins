<?php
/**
 * Simple build script
 * Grabs al files from /js folder and concats to /bootstrap.js
 */
class Build
{
	/**
	 * @var  string  Input path
	 */
	static $path_in = '/js';

	/**
	 * @var  string  Output path
	 */
	static $path_out = '/';

	/**
	 * @var  string  Output file
	 */
	static $out_file = 'bootstrap.js';

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		// Initialise config variables
		$dir_in 	= realpath(__DIR__ . self::$path_in);
		$dir_out	= realpath(__DIR__ . self::$path_out);
		$out_file	= $dir_out . '/' . self::$out_file;

		// Append environment.js at the top
		$this->append ($dir_in . '/environment.js', $out_file);
		
		// Append each file
		foreach (glob ($dir_in . '/bootstrap-*.js') as $filePath)
		{
			$this->append ($filePath, $out_file, true);
		}

		echo 'Created <a href="' . self::$out_file . '">/' . self::$out_file . '</a>';

		return;
	}

	/**
	 * Append file
	 *
	 * @param   string  $in_file   Included filename
	 * @param   string  $out_file  Output filename
	 * @param   string  $spacer    Space between concat files
	 *
	 * @return  integer|boolean    File length on success, false on failure
	 */
	protected function append ($in_file, $out_file, $append = false, $spacer = "\n\n\n")
	{
		return file_put_contents (
			$out_file,
			(file_get_contents ($in_file) . $spacer),
			($append ? FILE_APPEND : 0)
		);
	}
}


// Go
new Build;

# let-em-cook

To begin virtual environment within the current PowerShell session, you will need to run the following command from the home directory: .\env\Scripts\activate.ps1.

If you encounter an error stating, "..\env\Scripts\Activate.ps1 cannot be loaded because running scripts is disabled on the system" due to Execution Policy Settings, you will need to execute the following command first: Set-ExecutionPolicy Unrestricted -Scope Process. Then run the command above, which should launch the virtual environment.
# TST Technologies Catalogue - Deployment Guide

This guide provides step-by-step instructions for deploying the TST Technologies Catalogue React application to a Shared Hosting environment (e.g., cPanel, Hostinger, GoDaddy, Bluehost) or any static file server.

## Prerequisites

Before you begin, ensure you have the following:

1.  **Node.js & npm**: Installed on your local development machine to build the project.
2.  **Access to Hosting**: FTP access (FileZilla) or File Manager access via your hosting control panel.

## Step 1: Build the Project

React applications must be "built" into static files (HTML, CSS, and JavaScript) before they can run in a browser.

1.  Open your terminal or command prompt in the project's root directory.
2.  Run the build command:

    ```bash
    npm run build
    ```

3.  This process will create a `dist/` (or sometimes `build/`) folder in your project directory. This folder contains the production-ready files.

## Step 2: Prepare for Shared Hosting

### Routing Configuration
The app currently uses **HashRouter** (URLs look like `domain.com/#/about`). This is the easiest method for shared hosting as it requires **no server configuration**.

However, if you decide to switch to **BrowserRouter** (URLs look like `domain.com/about`) in the future, you must add a `.htaccess` file.

## Step 3: Upload to Server

1.  **Locate the Build Folder**: Go to your project folder on your computer and find the `dist` folder created in Step 1.
2.  **Connect to Hosting**:
    *   Use an FTP client (like FileZilla) OR
    *   Log in to your hosting Control Panel (cPanel/hPanel) and open the "File Manager".
3.  **Navigate to Public Directory**:
    *   Go to `public_html` (or `www`).
    *   If you are deploying to a subdomain (e.g., `catalogue.tsttechnologies.com`), navigate to the folder created for that subdomain.
4.  **Upload Files**:
    *   Select **ALL** files and folders **inside** the `dist` folder.
    *   Upload them directly to the server folder.
    *   **Important**: Do **not** upload the `dist` folder itself. Upload the *contents* of it. Your `index.html` should be sitting directly in `public_html` (or your subdomain folder).

---

## Managing .htaccess File (Step-by-Step)

The `.htaccess` file is a configuration file for Apache servers. You usually need this if you want to remove the `#` from URLs or force HTTPS.

### How to ADD or CREATE an .htaccess file

**Option A: Create Locally and Upload**
1.  On your computer, open a text editor (Notepad, VS Code).
2.  Paste the following code (Standard React Router Redirect):
    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>
    ```
3.  Save the file as `htaccess.txt` (Windows often prevents saving as just `.htaccess`).
4.  Upload `htaccess.txt` to your hosting `public_html` folder.
5.  In your hosting File Manager, rename the file from `htaccess.txt` to `.htaccess` (ensure the dot is at the start).

**Option B: Create directly in cPanel File Manager**
1.  Login to cPanel and open **File Manager**.
2.  Navigate to `public_html`.
3.  Click **+ File** in the top left.
4.  Name the file `.htaccess` and click **Create New File**.
5.  Right-click the new file and select **Edit**.
6.  Paste the code above and save.

### How to EDIT or DELETE .htaccess (If you can't see it)

Files starting with a dot (`.`) are "Hidden Files". If you uploaded it but can't see it:

1.  Open **File Manager** in cPanel.
2.  Look for a **Settings** button (usually top right corner).
3.  Check the box that says **"Show Hidden Files (dotfiles)"**.
4.  Click Save.
5.  Now you will see `.htaccess`.
    *   **To Edit**: Right-click -> Edit.
    *   **To Delete**: Right-click -> Delete.

---

## Step 4: Verify Deployment

1.  Open your web browser.
2.  Visit your domain URL.
3.  You should see the TST Technologies home page.
4.  Click through the navigation links to ensure the application works smoothly.

## Troubleshooting

*   **Blank Page**: 
    *   Open Developer Tools (F12) and check the Console.
    *   If you see 404 errors for `.js` or `.css` files, ensure you uploaded the `assets` folder correctly.
    *   Verify that `index.html` is in the correct directory.
*   **404 Error on Refresh**: 
    *   If you switched to `BrowserRouter` and get a 404 error when refreshing a page like `/about`, you **must** add the `.htaccess` file as described above.

## Local Development

To run the project locally on your machine for development:

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
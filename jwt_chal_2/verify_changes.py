import requests

BASE_URL = "http://localhost:3005"

try:
    # 1. Check /api/time (should NOT have window)
    print("Checking /api/time...")
    try:
        time_resp = requests.get(f"{BASE_URL}/api/time").json()
        if 'window' not in time_resp:
            print("[SUCCESS] 'window' field is missing from /api/time")
        else:
            print(f"[FAILURE] 'window' field is present: {time_resp.get('window')}")
    except Exception as e:
        print(f"[ERROR] Failed to check /api/time: {e}")

    # 2. Check /api/login (should set cookie)
    print("\nChecking /api/login...")
    try:
        login_resp = requests.post(
            f"{BASE_URL}/api/login", 
            json={'username': 'optimus', 'password': 'bee2007'}
        )
        
        if login_resp.status_code == 200:
            # Check cookies specifically
            cookie_found = False
            for cookie in login_resp.cookies:
                if cookie.name == 'formula':
                    print(f"[SUCCESS] 'formula' cookie found: {cookie.value}")
                    cookie_found = True
                    break
            
            if not cookie_found:
                print("[FAILURE] 'formula' cookie NOT found in response")
                print(f"DEBUG: Cookies received: {login_resp.cookies.get_dict()}")
        else:
            print(f"[FAILURE] Login failed with status {login_resp.status_code}")
            print(f"Response: {login_resp.text}")

    except Exception as e:
        print(f"[ERROR] Failed to check /api/login: {e}")

except Exception as e:
    print(f"[CRITICAL ERROR] Script failed: {e}")

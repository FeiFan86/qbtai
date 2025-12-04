#!/usr/bin/env python3
import sys
import urllib.parse

def test_mongodb_connection():
    mongodb_uri = "mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin"
    
    print("=== MongoDB 连接测试 ===")
    print(f"连接字符串: mongodb://root:****@183.87.130.22:27017/cupid-ai?authSource=admin")
    print()
    
    # 解析连接字符串
    try:
        parsed = urllib.parse.urlparse(mongodb_uri)
        host = parsed.hostname
        port = parsed.port
        username = parsed.username
        database = parsed.path.strip('/')
        
        print("解析结果:")
        print(f"  - 主机: {host}")
        print(f"  - 端口: {port}")
        print(f"  - 用户名: {username}")
        print(f"  - 数据库: {database}")
        
        # 检查网络连通性（简单测试）
        import socket
        print(f"\n正在测试网络连接...")
        
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        
        try:
            result = sock.connect_ex((host, port))
            if result == 0:
                print("✅ 网络连接正常 - 端口可访问")
            else:
                print("❌ 网络连接失败 - 端口不可访问")
                print("可能的原因:")
                print("  1. MongoDB服务器未运行")
                print("  2. 防火墙阻止了连接")
                print("  3. 服务器地址或端口错误")
        except socket.gaierror:
            print("❌ 无法解析主机名")
        except socket.timeout:
            print("❌ 连接超时")
        finally:
            sock.close()
            
    except Exception as e:
        print(f"❌ 连接字符串解析失败: {e}")
    
    print("\n=== 测试完成 ===")

if __name__ == "__main__":
    test_mongodb_connection()
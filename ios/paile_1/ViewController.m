//
//  ViewController.m
//  MyDemo
//
//  Created by 糖葫芦 on 15/12/3.
//  Copyright © 2015年 糖葫芦. All rights reserved.
//

#import "ViewController.h"
#import <CoreMotion/CoreMotion.h>

@interface ViewController ()
{
    NSTimer* updateTimer;
}
@property (strong , nonatomic) CMMotionManager* motionManager;
@end


@implementation ViewController

@synthesize captureManager;
@synthesize scanningLabel;
@synthesize imgLabel;

- (void)viewDidLoad {
    [self setCaptureManager:[[[CaptureSessionManager alloc] init] autorelease]];
    
    [[self captureManager] addVideoInput];
    
    [[self captureManager] addVideoPreviewLayer];
    CGRect layerRect = [[[self view] layer] bounds];
    [[[self captureManager] previewLayer] setBounds:layerRect];
    [[[self captureManager] previewLayer] setPosition:CGPointMake(CGRectGetMidX(layerRect),
                                                                  CGRectGetMidY(layerRect))];
    [[[self view] layer] addSublayer:[[self captureManager] previewLayer]];
    
    UILabel *tempLabel = [[UILabel alloc] initWithFrame:CGRectMake(100, 50, 600, 300)];
    [self setScanningLabel:tempLabel];
    [tempLabel release];
    [scanningLabel setBackgroundColor:[UIColor clearColor]];
    [scanningLabel setFont:[UIFont fontWithName:@"Courier" size: 18.0]];
    [scanningLabel setTextColor:[UIColor redColor]];
    [scanningLabel setText:@"Scanning..."];
    [[self view] addSubview:scanningLabel];
    
    [[captureManager captureSession] startRunning];
    
    // 创建CMMotionManager对象
    self.motionManager = [[CMMotionManager alloc] init];
    // 如果可以获取设备的动作信息
    if (self.motionManager.deviceMotionAvailable)
    {
        // 开始更新设备的动作信息
        [self.motionManager startDeviceMotionUpdates];
    }
    else
    {
        NSLog(@"该设备的的deviceMotion不可用");
    }
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    // 使用定时器周期性地获取设备移动信息
    updateTimer = [NSTimer scheduledTimerWithTimeInterval:0.1
                                                   target:self selector:@selector(updateDisplay)
                                                 userInfo:nil repeats:YES];
}

- (void)updateDisplay
{
    if (self.motionManager.deviceMotionAvailable)
    {
        // 获取设备移动信息
        CMDeviceMotion *deviceMotion = self.motionManager.deviceMotion;
        NSMutableString* str = [NSMutableString
                                stringWithString:@""];
        [str appendFormat:@"(%+.2f,", deviceMotion.attitude.yaw*180/3.14];
        [str appendFormat:@"%+.2f)\n" , deviceMotion.attitude.pitch*180/3.14];
        [scanningLabel setText:str];
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc {
    [captureManager release], captureManager = nil;
    [scanningLabel release], scanningLabel = nil;
    [super dealloc];
}

@end
